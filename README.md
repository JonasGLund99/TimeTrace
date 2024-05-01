# TimeTrace - Timed Pattern Searching in Log Files

## React front end
Clone the GitHub project and cd into the project 

`cd TimeTrace`

### Install the necessary node packages
`npm i`

### Start the project
`npm start`

## MONAA back end
Because this project uses the MONAA tool that only runs on Ubuntu, a separate backend server has been set up and runs on CLAAUDIA.
For the front-end to connect to CLAAUDIA, it is necessary with an SSH tunnel.

### SSH tunnel setup
**Step 1 - Private key**
Save your private key (<private_key.pem>) somewhere safe.

**Step 2 - SSH**
Open a terminal and run the following ssh command:
`ssh -i "path/to/private_key.pem" ubuntu@130.225.37.239 -L 5000:localhost:5000`
This will tunnel port 5000 on the server to localhost:5000.

**Step 3 - Open browser**
Open your browser and go to localhost:3000 where the TimeTrace front-end will be hosted.

Follow the guides on the home page on how to use TimeTrace.

*You should not need anything else from this guide to use the tool unless you are a developer*
---

### SSH information
Blogpost: https://www.combell.com/en/help/kb/create-an-openstack-linux-instance-and-connect-to-it-via-internet/

Ubuntu server: https://strato-new.claaudia.aau.dk/project/instances/
Ubuntu server IP: http://130.225.37.239

### Start MONAA flask server
`cd MONAA-backend` 

(`git pull`)

`nohup python3 -m flask --app server run &`

This should start the flask server and you should be able to close the terminal without the server shutting down.

### Check running Python scripts and kill them
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

### Recommended extensions for VSCode:
[Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind)
