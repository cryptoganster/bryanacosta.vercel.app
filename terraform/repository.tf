resource "github_repository" "repo_settings" {
  name        = var.repository_name
  description = "Personal developer landing page showcasing skills, projects, experience, and ways to get in touch."
  homepage_url = "https://bryanacosta.vercel.app"
  visibility  = "public"

  # Merge settings - Only allow rebase merge
  allow_merge_commit   = false  # Disable "Create a merge commit"
  allow_squash_merge   = false  # Disable "Squash and merge"
  allow_rebase_merge   = true   # Enable "Rebase and merge"
  allow_auto_merge     = false
  delete_branch_on_merge = true # Auto-delete head branches after merge
  
  # Repository features
  has_issues      = true
  has_projects    = true
  has_wiki        = false
  has_discussions = false
  has_downloads   = true
  
  # Topics
  topics = [
    "framer-motion",
    "gsap",
    "landing-page",
    "next-js",
    "personal-website",
    "radix-ui",
    "react-js",
    "tailwind-css",
    "typescript",
    "vitest",
    "website",
  ]
  
  # Import existing repository
  lifecycle {
    prevent_destroy = true
  }
}
