resource "github_branch_protection" "protected_branches" {
  for_each = toset(var.protected_branches)

  repository_id = data.github_repository.repo.node_id
  pattern       = each.value

  # Require pull request reviews before merging
  required_pull_request_reviews {
    dismiss_stale_reviews           = var.dismiss_stale_reviews
    require_code_owner_reviews      = var.require_code_owner_reviews
    required_approving_review_count = var.required_approving_review_count
    require_last_push_approval      = false
  }

  # Require status checks to pass before merging
  required_status_checks {
    strict   = true # Require branches to be up to date before merging
    contexts = var.required_status_checks
  }

  # Enforce restrictions
  enforce_admins = var.enforce_admins

  # Additional settings
  allows_deletions                = var.allow_deletions
  allows_force_pushes             = var.allow_force_pushes
  require_conversation_resolution = var.require_conversation_resolution
  require_signed_commits          = var.require_signed_commits
  required_linear_history         = var.require_linear_history

  # Lock branch (prevent any pushes)
  lock_branch = false

  depends_on = [data.github_repository.repo]
}

# Data source to get repository information
# Using full_name to ensure we get all attributes including node_id
data "github_repository" "repo" {
  full_name = "${var.github_owner}/${var.repository_name}"
}
