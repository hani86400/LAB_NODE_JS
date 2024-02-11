#!/bin/sh
#######################################################################
T_SH_NAME='api_client.sh'                                # 2024_02_11 #
#######################################################################

export API_SERVER_HOST='localhost'
export API_SERVER_PORT='5055'
export API_SERVER_ROUTE='api/items'

export API_SERVER_PORT='3000'
export API_SERVER_ROUTE='subscribers'


export JSON_FLAG='YES'




alias api_server_1_run='cd /labs/LAB_NODE_JS_API_1/ && node server_api_1.js '
alias api_server_2_run='cd /labs/LAB_NODE_JS_API_1/ && node server_api_2.js '



#curl  http://google.com 2>/dev/null > temp.html


#######################################################################
#  f u n c t i o n
                   api_test_get_all(){
#######################################################################
if [ 'YES' = "${JSON_FLAG}" ] 
then
curl -s http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}| json_pp # GET_ALL"
else
curl -s http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}          # GET_ALL"
fi
} # f u n c t i o n [END] #############################################



#######################################################################
#  f u n c t i o n
                   api_test_get_1(){
#######################################################################
[[ !   -z "$1" ]] &&     THE_ID="${1}"  ||    THE_ID='1'   
if [ 'YES' = "${JSON_FLAG}" ] 
then
curl -s http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID} | json_pp
else
curl -s http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID}
fi
} # f u n c t i o n [END] #############################################
#######################################################################
#  f u n c t i o n
                   api_test_delete(){
#######################################################################
[[ !   -z "$1" ]] &&     THE_ID="${1}"  ||    THE_ID='1'   
if [ 'YES' = "${JSON_FLAG}" ] 
then
curl -s -X DELETE http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID} | json_pp
else
curl -s -X DELETE http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID}
fi
} # f u n c t i o n [END] #############################################

#######################################################################
#  f u n c t i o n
                   api_test_put(){
#######################################################################
[[ !   -z "$1" ]] &&     THE_ID="${1}"  ||    THE_ID='4'   
T_DATA="{\"name\": \"hani44\", \"password\": \"m&dHye44\" , \"email\": \"hani@hani.com44\" }"
if [ 'YES' = "${JSON_FLAG}" ] 
then
curl -s -X PUT    http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID} -H "Content-Type: application/json" -d "${T_DATA}" | json_pp
else
curl -s -X PUT    http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/${THE_ID} -H "Content-Type: application/json" -d "${T_DATA}" 
fi
} # f u n c t i o n [END] #############################################



#######################################################################
#  f u n c t i o n
                   api_test_post(){
#######################################################################
T_LENGTH=$(tr -dc 1-9 </dev/urandom | head -c 1)
T_NAME=$(tr -dc A-Za-z0-9 </dev/urandom | head -c ${T_LENGTH})
T_LENGTH=$(tr -dc 1-9 </dev/urandom | head -c 1)
T_EMAIL="${T_NAME}@$(tr -dc A-Za-z0-9 </dev/urandom | head -c ${T_LENGTH}).com"
T_LENGTH=$(tr -dc 1-9 </dev/urandom | head -c 1)
T_PASS=$(tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' </dev/urandom | head -c ${T_LENGTH})

T_DATA="{\"name\": \"${T_NAME}\", \"password\": \"${T_PASS}\" , \"email\": \"${T_EMAIL}\" , \"subscribedToChannel\": \"${T_NAME}\" }"

echo $T_DATA
#curl -X POST  http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE} -H "Content-Type: application/json" -d '{"name": "hani", "password": "m&dHye" , "email": "hani@hani.com" }'
curl -X POST  http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE} -H "Content-Type: application/json" -d "${T_DATA}"
} # f u n c t i o n [END] #############################################



#######################################################################
#  f u n c t i o n
                   api_client_files(){
#######################################################################
ls -1a hani_tools.js .env api_server.js api_client.sh
} # f u n c t i o n [END] #############################################


#######################################################################
#  f u n c t i o n
                   api_client_test(){
#######################################################################
echo -e "\n\e[1;96m[ From: api_client_test ] \e[0m";
echo
echo -e "\n\e[1;96m[ GET_ALL ] \e[0m";
api_test_get_all



echo -e "\n\e[1;96m[ GET_1 ] \e[0m";
api_test_get_1 1

echo -e "\n\e[1;96m[ GET_1 (not exist)] \e[0m";
api_test_get_1 123587


echo -e "\n\e[1;96m[ POST ] \e[0m";
api_test_post

echo -e "\n\e[1;96m[ DELETE ] \e[0m";
api_test_delete


echo -e "\n\e[1;96m[ PUT before] \e[0m";
     curl http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/4| json_pp # GET_1
echo -e "\n\e[1;96m[ PUT after] \e[0m";
echo 'CURL -X PUT  http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/4 -H "Content-Type: application/json" -d !{"name": "hani44", "password": "m&dHye44" , "email": "hani@hani.com44" }!'
     curl -X PUT  http://${API_SERVER_HOST}:${API_SERVER_PORT}/${API_SERVER_ROUTE}/4 -H "Content-Type: application/json" -d '{"name": "hani44", "password": "m&dHye44" , "email": "hani@hani.com44" }' | json_pp



} # f u n c t i o n [END] #############################################
