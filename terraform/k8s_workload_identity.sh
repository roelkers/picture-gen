kubectl create serviceaccount k8s-pubsub

gcloud iam service-accounts create global-k8s-pubsub --pr
oject=picture-generator

gcloud projects add-iam-policy-binding picture-generator --member "serviceAccount:global-k8s-pubsub@picture-generator.
iam.gserviceaccount.com" --role "pubsub.editor"

gcloud iam service-accounts add-iam-policy-binding global-k8s-pubsub@picture-generator.iam.gserviceaccount.com --role
roles/iam.workloadIdentityUser --member "serviceAccount:picture-generator.svc.id.goog[default/k8s-pubsub]"
