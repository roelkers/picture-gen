## Data Sources
data "google_client_config" "default" {}

## Variables
variable "project" {}
variable "region" { default = "europe-west3" }
variable "cluster_name" {}
variable "network" { default = "default" }
variable "subnetwork" { default = "" }
variable "ip_range_pods" { default = "" }
variable "ip_range_services" { default = "" }

resource "google_pubsub_topic" "clicksTopic" {
  name = "clicks"

  labels = {
    app = "picture"
  }

  message_retention_duration = "86600s"
}

resource "google_pubsub_subscription" "clicks" {
  name  = "clicksSubscription"
  topic = google_pubsub_topic.clicksTopic.name

  ack_deadline_seconds = 20

  labels = {
    app = "picture"
  }

  message_retention_duration = "1200s"
  retain_acked_messages      = true

  expiration_policy {
    ttl = "300000.5s"
  }
  retry_policy {
    minimum_backoff = "10s"
  }

  enable_message_ordering    = false
}

## GKE Cluster
module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "23.0.0"

  # required variables
  project_id        = var.project
  name              = var.cluster_name
  region            = var.region
  network           = var.network
  subnetwork        = var.subnetwork
  ip_range_pods     = var.ip_range_pods
  ip_range_services = var.ip_range_services

  # optional variables
  kubernetes_version       = "1.22.11-gke.400"
  regional                 = true
  create_service_account   = false
  remove_default_node_pool = true

  # addons
  network_policy             = false
  horizontal_pod_autoscaling = true
  http_load_balancing        = true

  node_pools = [
    {
      name               = "default-node-pool"
      machine_type       = "n1-standard-1"
      min_count          = 2
      max_count          = 4
      local_ssd_count    = 0
      disk_size_gb       = 100
      disk_type          = "pd-standard"
      image_type         = "COS"
      auto_repair        = true
      auto_upgrade       = true
      initial_node_count = 1
    },
  ]

  node_pools_oauth_scopes = {
    all = []
    default-node-pool = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }

  node_pools_labels = {
    all = {}
    default-node-pool = {
      default-node-pool = true,
    }
  }

  node_pools_tags = {
    all = []
    default-node-pool = [
      "default-node-pool",
    ]
  }

}
