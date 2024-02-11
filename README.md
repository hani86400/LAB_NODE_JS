# LAB_NODE_JS_API_1
nodeJS Remarks.


#### Define module uuid
```
import { v4 as uuidv4 }      from 'uuid'; // ES6
// OR
const  { v4:   uuidv4 } = require('uuid');
```

#### Start new project (local)
```
#Create new folder and cd to it
mkdir $NEW_PROJECT_DIR && cd  $NEW_PROJECT_DIR

# initiate 
npm init -y
```
#### Clone project from github
```
git clone https://github.com/hani86400/LAB_NODE_JS_API_1.git
cd LAB_NODE_JS_API_1
npm install
# then run project directly
node server1.js
```

