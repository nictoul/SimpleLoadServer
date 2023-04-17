# SimpleLoadServer
Simple server with api to make load on the server. 
The intention is to use the server on kubernetes to make tests when it will ready

work in progress...

## Docker image creation
This is to try container app.
This was intended to test kubernetes so documentation is aim for that

more information to dockerizing a Node.js web app here:

    https://nodejs.org/en/docs/guides/nodejs-docker-webapp

### Docker build (optional)
You can try to build docker image and push it to the cloud on dockerhub
You can also use the one I generated: 

https://hub.docker.com/r/julcoli/simple-load-server1

To build the image on your computer. It build it localy 
but with the name of the repo in dockerHub
The name of the user in docker hub is "julcoli"
The name of the repo (image) is "simple-load-server1" 

    docker build . -t julcoli/simple-load-server1

### Push image to your docker hub (optional)
I didn't find a way to use a local image even if i found doc to do it
This command push the image in the "simple-load-server1" repository in 
the julcoli user of dockerhub with the tag latest
This image is public so you can get it

    docker push julcoli/simple-load-server1:latest

## Run the container in kubernetes with minikube
See this documentation to use a cluster on your local PC

    https://jstrategiaconseilssolutions.sharepoint.com/:fl:/g/contentstorage/CSP_8d7f5d55-32ab-400d-920b-363107996a2c/EVw46qYeO7pHhSEZnyDIYm8BsrUFtGu1lhMADzLdqA7Z-g?e=EL3V4W&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF84ZDdmNWQ1NS0zMmFiLTQwMGQtOTIwYi0zNjMxMDc5OTZhMmMmZD1iJTIxVlYxX2phc3lEVUNTQ3pZeEI1bHFMT2FfdHRhX1RVbEl1bXRwc1Y0cVhxY0R5VVNqUHQwM1NMUVlLekdvalA5eCZmPTAxMzJQREpQSzRIRFZLTUhSM1hKRFlLSUlaVDRRTVFZVFAmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4cWMzUnlZWFJsWjJsaFkyOXVjMlZwYkhOemIyeDFkR2x2Ym5NdWMyaGhjbVZ3YjJsdWRDNWpiMjE4WWlGV1ZqRmZhbUZ6ZVVSVlExTkRlbGw0UWpWc2NVeFBZVjkwZEdGZlZGVnNTWFZ0ZEhCelZqUnhXSEZqUkhsVlUycFFkREF6VTB4UldVdDZSMjlxVURsNGZEQXhNekpRUkVwUVVGcElXVlZLU1VWRFFWRk9SbHBOUTFZMVVFSTNUMDVSV1ZjJTNEJTIyJTJDJTIyaSUyMiUzQSUyMjE4ZjYyMDQ3LTYzYzYtNDA4ZC04MGIwLTUxODViZWIzZGVjMCUyMiU3RA%3D%3D

### Start your local cluster
The -p nic.cluster is to specify the cluster name.

    minikube -p nic.cluster start

Create the deployment container for you app with your image

    kubectl create deployment simpleloadserver --image=julcoli/simple-load-server1:latest

### Expose communication port
The port that communicate with the server is in the file "server.js"
This port is in the app container of kubernetes and need to be expose
to be accessible.

This command create the "service" resource in kubernetes

    kubectl expose deployment simpleloadserver --type=NodePort --port=8081

### Open a tunnel to try communication
To try it on windows you need to use your windows pc port.
We need to create a tunnel from a port of windows pc to
the port previously exposed in the container (the service created)

    kubectl port-forward service/simpleloadserver 7081:8081

## Try it
You can see in "server.js" api spec and try it in postman
Here is a simple curl to try it:

    curl --location 'http://localhost:7081/simpleUsage/users'