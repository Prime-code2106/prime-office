import { useState, useCallback, useRef } from 'react';

export interface PaginationState<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  cursor: string | null;
}

export interface PaginationOptions {
  pageSize: number;
  initialCursor?: string | null;
}

export interface PaginationActions<T> {
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
  addItem: (item: T) => void;
  updateItem: (id: string, updater: (item: T) => T) => void;
  removeItem: (id: string) => void;
}

export function usePagination<T extends { id: string }>(
  fetchFn: (cursor: string | null, pageSize: number) => Promise<{
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
  }>,
  options: PaginationOptions
): [PaginationState<T>, PaginationActions<T>] {
  const [state, setState] = useState<PaginationState<T>>({
    items: [],
    hasMore: true,
    isLoading: false,
    error: null,
    cursor: options.initialCursor || null
  });

  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !state.hasMore) return;

    isLoadingRef.current = true;
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await fetchFn(state.cursor, options.pageSize);
      
      setState(prev => ({
        ...prev,
        items: [...prev.items, ...result.items],
        cursor: result.nextCursor,
        hasMore: result.hasMore,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load more items',
        isLoading: false
      }));
    } finally {
      isLoadingRef.current = false;
    }
  }, [fetchFn, state.cursor, state.hasMore, options.pageSize]);

  const refresh = useCallback(async () => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null,
      cursor: options.initialCursor || null
    }));

    try {
      const result = await fetchFn(options.initialCursor || null, options.pageSize);
      
      setState({
        items: result.items,
        cursor: result.nextCursor,
        hasMore: result.hasMore,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to refresh',
        isLoading: false
      }));
    } finally {
      isLoadingRef.current = false;
    }
  }, [fetchFn, options.pageSize, options.initialCursor]);

  const reset = useCallback(() => {
    setState({
      items: [],
      hasMore: true,
      isLoading: false,
      error: null,
      cursor: options.initialCursor || null
    });
  }, [options.initialCursor]);

  const addItem = useCallback((item: T) => {
    setState(prev => ({
      ...prev,
      items: [item, ...prev.items] // Add to beginning for newest first
    }));
  }, []);

  const updateItem = useCallback((id: string, updater: (item: T) => T) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? updater(item) : item
      )
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  }, []);

  return [
    state,
    {
      loadMore,
      refresh,
      reset,
      addItem,
      updateItem,
      removeItem
    }
  ];
}