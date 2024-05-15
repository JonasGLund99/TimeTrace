# TimeTrace | Timed Pattern Searching in Log Files

[TimeTrace](https://time-trace.vercel.app/){:target="_blank"} is deployed on Vercel; however, it is necessary to have an SSH-key to send request to the [MONAA backend](https://github.com/AndersToft20/monaa-backend). 

An SSH-key can be obtained by contacting either [jgl21@student.aau.dk](mailto:jgl21@student.aau.dk) or [asbchr21@student.aau.dk](mailto:asbchr21@student.aau.dk).

## React frontend
Clone the repository and cd into the project 

`cd TimeTrace`

### Install the necessary node packages
`npm i`

### Start the project
`npm start`

## MONAA backend
Because this project utilises [MONAA](https://github.com/MasWag/monaa) that only runs on Ubuntu and Windows, a separate [backend server](https://github.com/AndersToft20/monaa-backend) has been set up and runs on [CLAAUDIA Strato Compute Cloud](https://www.strato-docs.claaudia.aau.dk/).
For the frontend to connect to CLAAUDIA, it is necessary with an SSH tunnel.

### SSH tunnel setup

**Step 1 - Private key**
Save your private key (<private_key.pem>) somewhere safe.

**Step 2 - SSH**
Open a terminal and run the following ssh command:

`ssh -i "path/to/private_key.pem" ubuntu@130.225.37.239 -L 5000:localhost:5000`

This will tunnel port 5000 on the server to localhost:5000.

**Step 3 - Open browser**
Open your browser and go to localhost:3000 or [time-trace.vercel.app](https://time-trace.vercel.app/) where the TimeTrace frontend will be hosted.

Follow the guides on the [home page](https://time-trace.vercel.app/)  on how to use TimeTrace.

*You should not need anything else from this guide to use the tool unless you are a developer*
---

### SSH information
- [CLAAUDIA documentation](https://www.strato-docs.claaudia.aau.dk/guides/getting_started/access_instance/) on SSH connection.

- Instance on [CLAAUDIA Strato Compute Cloud](https://strato-new.claaudia.aau.dk/project/instances/)

- Ubuntu server IP: 130.225.37.239

### Start MONAA backend server
The [MONAA backend](https://github.com/AndersToft20/monaa-backend) is built using Flask. Use the following commands (when conencted via SSH) if the server is down.

`cd monaa-backend` 

Optional: `git pull`

`nohup python3 -m flask --app server run &`

This should start the Flask server and you should be able to close the terminal without the server shutting down.

### Check running Python processes and kill them
To check what Python processes are running, use the command:

`pgrep python3`

To kill a Python process, use the command:

`sudo kill <process-id>`

### Postman
Import `P6.postman_collection.json` in your Postman App.

**POST Body**
In the body select raw and add a JSON body of the format below.
*lines* Is an array of strings symbolising the lines of the file uploaded.

*regex* Add a valid timed regular expression using the MONAA syntax.

Your request should look something like below

![Postman example](postman_example.png)

Send your request and view the response
