/**
 * GITHUB ACTIVITY WIDGET
 * Displays GitHub profile statistics and activity
 * 
 * FEATURES:
 * - GitHub profile stats (repos, stars, followers)
 * - Top repositories showcase
 * - Programming language statistics
 * - Contribution activity
 * - GitHub README Stats integration
 * 
 * CUSTOMIZATION:
 * - Line 33: Update githubUsername to YOUR actual GitHub username
 * - Lines 46-75: Update with your actual repositories
 * - Lines 78-84: Update language stats based on your work
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ExternalLink, Github, Star, GitFork, Users, Loader2 } from "lucide-react";

export function GitHubActivity() {
  const githubUsername = "Prime-code2106";
  const githubUrl = `https://github.com/${githubUsername}`;

  // State for GitHub data
  const [stats, setStats] = useState({
    publicRepos: 5,
    totalStars: 0,
    forks: 0,
    followers: 1,
    following: 0,
    contributions: 0 // Will be handled by the README stats card
  });

  const [topRepositories, setTopRepositories] = useState([
    {
      name: "my-potfolio",
      description: "Personal portfolio website",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: `https://github.com/${githubUsername}/my-potfolio`
    },
    {
      name: "Daddy",
      description: "Communication application",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: `https://github.com/${githubUsername}/Daddy`
    },
    {
      name: "learnbyte",
      description: "Educational platform",
      language: "Web",
      stars: 0,
      forks: 0,
      url: `https://github.com/${githubUsername}/learnbyte`
    },
    {
      name: "ecovault",
      description: "Project Ecovault",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: `https://github.com/${githubUsername}/ecovault`
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch User Profile
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setStats(prev => ({
            ...prev,
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following
          }));
        }

        // Fetch Repositories
        const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          
          // Map API data to our format
          const mappedRepos = reposData.map((repo: any) => ({
            name: repo.name,
            description: repo.description || "No description provided",
            language: repo.language || "Web",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url
          }));
          
          setTopRepositories(mappedRepos);
          
          // Calculate total stars from fetched repos
          const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
          const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);
          
          setStats(prev => ({
            ...prev,
            totalStars,
            forks: totalForks
          }));
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [githubUsername]);

  const languages = [
    { name: "TypeScript", percentage: 60, color: "bg-blue-500" },
    { name: "JavaScript", percentage: 25, color: "bg-yellow-500" },
    { name: "HTML/CSS", percentage: 10, color: "bg-orange-500" },
    { name: "Other", percentage: 5, color: "bg-gray-500" }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
            {isLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(githubUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* GITHUB STATS GRID */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">{stats.publicRepos}</div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">{stats.totalStars}</div>
            <div className="text-xs text-muted-foreground">Stars</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">{stats.forks}</div>
            <div className="text-xs text-muted-foreground">Forks</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-xl font-bold">
              <Users className="h-4 w-4" />
              {stats.followers}
            </div>
            <div className="text-xs text-muted-foreground">Follower</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-xl font-bold">
              <Users className="h-4 w-4" />
              {stats.following}
            </div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>

        {/* PROGRAMMING LANGUAGES */}
        <div>
          <h4 className="font-semibold mb-3">💻 Language Statistics</h4>
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground">{lang.percentage}%</span>
                </div>
                <Progress value={lang.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* TOP REPOSITORIES */}
        <div>
          <h4 className="font-semibold mb-3">⭐ Top Repositories</h4>
          <div className="space-y-3">
            {topRepositories.map((repo, index) => (
              <div
                key={index}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => window.open(repo.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-semibold text-sm flex items-center gap-2 font-mono">
                    <Github className="h-4 w-4" />
                    {repo.name}
                  </h5>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{repo.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px] h-5 px-1 bg-primary/5">
                    {repo.language}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIEW ALL REPOSITORIES */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(`${githubUrl}?tab=repositories`, '_blank')}
        >
          View All Repositories
        </Button>

        {/* GITHUB README STATS */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-semibold">📈 Live GitHub Stats</h4>
          <div className="space-y-3">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117&title_color=ffffff&text_color=9ca3af&icon_color=3b82f6`}
              alt="GitHub Stats"
              className="w-full rounded-lg"
              loading="lazy"
            />
            
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=0d1117&ring=3b82f6&fire=3b82f6&currStreakNum=ffffff`}
              alt="GitHub Streak"
              className="w-full rounded-lg"
              loading="lazy"
            />

            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=dark&hide_border=true&bg_color=0d1117&title_color=ffffff&text_color=9ca3af`}
              alt="Top Languages"
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
