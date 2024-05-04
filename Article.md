It is possible to install dynamodb locally,lets explore how.

First Download jar file

wget https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.tar.gz

Now extract the the archieve.

Rename extracted folder as dynamodb

Copy it to location where you want to install binary

mv dynamodb /usr/share/

Now on command line go to folder in which dynamodb is copied,
in this case /usr/share/dynamodb.

cd /usr/share/dynamodb

Test i it runs from terminal by running this

sudo java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

Now if you want to test the server each time you would have to run this command
To keep it running each time without running manually we need a service.

To create a service

sudo nano /etc/systemd/system/dynamodb.service

add ollowing to it

[Unit]
Description=DynamoDB  Service
[Service]
User=root
WorkingDirectory=/usr/share/dynamodb
ExecStart=/usr/share/dynamodb/dynamodb.sh
SuccessExitStatus=143
TimeoutStopSec=10
Restart=on-failure
RestartSec=5
[Install]
WantedBy=multi-user.target

save & exit


Now we will create a shell script file referred in service above.

cd /usr/share/dynamodb
nano dynamodb.sh

add 

#!/bin/sh
sudo java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb


save and exit.

Make shell script executable file

chmod u+x dynamodb.sh

Now let system know that we have created a new service

sudo systemctl daemon-reload
sudo systemctl enable dynamodb
sudo systemctl start dynamodb
sudo systemctl status dynamodb


output of last command in my case is like below

● dynamodb.service - Dynamo DB Local Service
     Loaded: loaded (/etc/systemd/system/dynamodb.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2024-05-04 11:13:52 IST; 11min ago
   Main PID: 33499 (dynamodb.sh)
      Tasks: 41 (limit: 18708)
     Memory: 150.8M
        CPU: 4.333s
     CGroup: /system.slice/dynamodb.service
             ├─33499 /bin/sh /usr/share/dynamodb/dynamodb.sh
             ├─33500 sudo java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
             └─33501 java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

May 04 11:13:52 sangram-Inspiron-14-5430 sudo[33500]:     root : PWD=/usr/share/dynamodb ; USER=root ; COMMAND=/usr/bin/java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
May 04 11:13:52 sangram-Inspiron-14-5430 sudo[33500]: pam_unix(sudo:session): session opened for user root(uid=0) by (uid=0)
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: Initializing DynamoDB Local with the following configuration:
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: Port:        8000
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: InMemory:        false
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: Version:        2.4.0
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: DbPath:        null
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: SharedDb:        true
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: shouldDelayTransientStatuses:        false
May 04 11:13:53 sangram-Inspiron-14-5430 dynamodb.sh[33501]: CorsParams:        null


Now we need to install awscli on ubuntu as ollows

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" 
-o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install


Now run aws configure
and give below response to when prompted.

AWS Access Key ID [****************yId"]: fakeMyKeyId
AWS Secret Access Key [****************Key"]: fakeSecretAccessKey
Default region name ["fakeRegion"]: fakeRegion
Default output format [None]: 


The response need to be given as given above.


Now you can check lists o tables in dynamodb by running follwoing command

aws dynamodb list-tables --endpoint-url http://localhost:8000
