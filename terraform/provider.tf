terraform {
  required_providers {
    google = {
      version = "~> 4.34.0"
    }

    random = {
      version = "~> 2.2.1"
    }

    null = {
      version = "~> 3.1.1"
    }

    github = {
      source  = "integrations/github"
      version = ">= 4.5.2"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.2"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.10.0"
    }
    flux = {
      source  = "fluxcd/flux"
      version = ">= 0.0.13"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "3.1.0"
    }
  }
}

provider "google" {
    region  = var.region
    project = var.project
    credentials = file("../credentials/picture-generator-9239ad5ce825.json")
}
