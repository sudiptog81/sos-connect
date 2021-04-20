# k8s-thing

**TL;DR** Nuxt.js frontend exposed at `http://k8s-thing.k8s/` and Express.js API exposed at `http://k8s-thing.k8s/api/v1` backed by a Redis k/v store.

![image](.github/images/diagram.png)

```bash
$ kubectl get po
NAME                                 READY   STATUS    RESTARTS   AGE
...
k8s-thing-backend-75888f6757-q6qr9   1/1     Running   0          2m17s
k8s-thing-frontend-965797876-6crkx   1/1     Running   0          2m17s
k8s-thing-redis-588654995-6ww9s      1/1     Running   0          2m17s
...

$ kubectl get svc
NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
...
k8s-thing-backend-service    ClusterIP   10.107.223.39   <none>        80/TCP     2m19s
k8s-thing-frontend-service   ClusterIP   10.99.86.161    <none>        80/TCP     2m19s
k8s-thing-redis-service      ClusterIP   None            <none>        6379/TCP   2m19s
kubernetes                   ClusterIP   10.96.0.1       <none>        443/TCP    4h41m
...

$ kubectl get ing
NAME                CLASS    HOSTS   ADDRESS        PORTS   AGE
...
k8s-thing-ingress   <none>   *       192.168.49.2   80      2m20s
...

$ kubectl get configmap
NAME                       DATA   AGE
...
k8s-thing-backend-config   1      2m23s
...

$ kubectl get secrets
NAME                       TYPE                                  DATA   AGE
...
k8s-thing-redis-password   Opaque                                1      2m28s
...
```

## Quick Start

Assuming you have configured the settings for your container registry and replaced a few things here and there.

```bash
make docker
make push
make deploy
```

## Configure /etc/hosts

```plain
<cluster-ip> k8s-thing.k8s
```

## Build Images

```bash
docker build -t ghcr.io/sudiptog81/k8s-thing-backend backend
docker build -t ghcr.io/sudiptog81/k8s-thing-frontend frontend
```

## Push Images to GitHub CR

```bash
docker push ghcr.io/sudiptog81/k8s-thing-backend
docker push ghcr.io/sudiptog81/k8s-thing-frontend
```

## Push Registry Credentials to Cluster

```bash
kubectl create secret generic regcred \
  --from-file=.dockerconfigjson=.docker/config.json \
  --type=kubernetes.io/dockerconfigjson
```

## Deploy on k8s

```bash
kubectl create secret generic k8s-thing-redis-password \
  --from-literal=k8s-thing-redis-password=password123
kubectl apply -f cache/deployment.yml
kubectl apply -f cache/service.yml
kubectl apply -f backend/k8s/configmap.yml
kubectl apply -f backend/k8s/deployment.yml
kubectl apply -f backend/k8s/service.yml
kubectl apply -f frontend/k8s/deployment.yml
kubectl apply -f frontend/k8s/service.yml
kubectl apply -f k8s/ingress.yml
```

## Delete Deployment

```bash
kubectl delete secret k8s-thing-redis-password
kubectl delete deployment k8s-thing-backend
kubectl delete deployment k8s-thing-frontend
kubectl delete deployment k8s-thing-redis
kubectl delete configmap k8s-thing-backend-config
kubectl delete service k8s-thing-backend-service
kubectl delete service k8s-thing-frontend-service
kubectl delete service k8s-thing-redis-service
kubectl delete ingress k8s-thing-ingress
```
