console.log(`from: \x1b[7m${__filename}\x1b[0m`);

const dotenv = require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
 | MONGO_USER & MONGO_PASSWORD  are  environment variables or set in .env file 
 +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const mongo_user = process.env.MONGO_USER || 'no_mongo_user';
const mongo_password = process.env.MONGO_PASSWORD || 'no_mongo_password';
const mongo_hostname = process.env.MONGO_HOSTNAME || 'mongo-conta' //'no_mongo_hostname';
const mongo_port = process.env.MONGO_PORT || 'no_27017';
const mongoUrl = `mongodb://${mongo_user}:${mongo_password}@${mongo_hostname}:${mongo_port}`;
  
const mongo_uri=process.env.DB_URI;
const mongo_db='dbxyz';
const mongo_collection='collxyz';

console.log(`mongoUrl= \x1b[7m${mongoUrl}\x1b[0m`);
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
 | Test Data 
 +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 const arrayA = new Array("RD", "HR", "IT"); 
 const arrayB =          ["RD", "HR", "IT"];
 
 const arrayC = [];
 const arrayD = new Array()
 arrayC[0]= "IT";
 let element = arrayA[2];
 console.log('typeof(arrayA)=' + typeof(arrayA) + '   Array.isArray(arrayA)=' + Array.isArray(arrayA) )
 console.log('  arrayB instanceof Array=' + arrayB instanceof Array)
  

const personA = ["John", "Doe", 46];
const personO = {firstName:"John", lastName:"Doe", age:46};
console.log('personA[0]=' + personA[0] + "  personO.firstName=" + personO.firstName)

for (let i = 0; i < arrayB.length; i++) { console.log('arrayB['+ i +']=' + arrayB[i]) }
console.log('arrayB.length=' + arrayA.length + ' arrayB.sort()=' + arrayB.sort())
for (let i = 0; i < arrayB.length; i++) { console.log('arrayB['+ i +']=' + arrayB[i]) }

function myFunction(item) { console.log( item)}
arrayB.forEach(myFunction)
arrayA.forEach(element => console.log(element));
  

let hani_json_doc = {"name":"Hani","email":"rtaffe0@slashdot.org","dep":"Research and Development","ip_address":"21.148.234.226"}
let hani_json_doc_array=[
  {"name":"Elyse","email":"egorusso1@istockphoto.com","dep":"Sales","ip_address":"78.223.84.161"},
  {"name":"Dianna","email":"dhandke2@cdbaby.com","dep":"Human Resources","ip_address":"168.144.122.6"},
  {"name":"Virgilio","email":"vconneau3@seattletimes.com","dep":"Services","ip_address":"189.181.239.135"},
  {"name":"Luce","email":"ltheodore4@simplemachines.org","dep":"Human Resources","ip_address":"45.137.6.195"},
  {"name":"Silas","email":"sarmiger5@blogtalkradio.com","dep":"Sales","ip_address":"54.141.193.221"},
  {"name":"Alikee","email":"adobkin6@google.es","dep":"Training","ip_address":"73.17.65.48"},
  ];





function isArrayElementExist(array, element) { return array.filter(e => e.name == element).length > 0; }

async function mongoConnec(uri) {
  let TempMongoClient;
  console.log('uri=' + uri)
  try {
      TempMongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas clmongoConnecuster...');
      await TempMongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');
      return TempMongoClient;
  } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      process.exit();
  }
}
async function mongoDo(operation,url,db_name,collection_name,doc, filter ,filter_options) {
  let mongoClient;
  let commandResult;
  let mylist=[];
  try {
      mongoClient = await mongoConnec(url + '');
      const db = mongoClient.db(db_name);
      const collection = db.collection(collection_name);
      console.log(`Try mongoDo operation=${operation}`);
      switch (operation) {
          case 'insertOne':
         // await collection.insertOne( doc);  
          commandResult = await  mongoClient.db(db_name).collection(collection_name).insertOne( doc);              
          console.log('Adding ' + commandResult.insertedId     )
          break  
          case 'insertMany':
            commandResult =  await  mongoClient.db(db_name).collection(collection_name).insertMany( doc);    
          console.log(`${commandResult.insertedCount} new listing(s) created with the following id(s):`);
          console.log(commandResult.insertedIds);
          break 
          case 'find':
          console.log(await  mongoClient.db(db_name).collection(collection_name).find(   filter,filter_options).toArray());
          break 
          case 'findAll':
         // console.log(await  mongoClient.db(db_name).collection(collection_name).find( {} ).toArray());
         mylist = await  mongoClient.db(db_name).collection(collection_name).find( {} ).toArray()
         console.log( mylist )
          break 
          case 'findSort':
          console.log(await collection.find(   filter,filter_options).toArray());
          break 
          case 'showDatabases':
            commandResult = await mongoClient.db("admin").command({ listDatabases: 1, nameOnly: false });
            console.log(commandResult.databases);
          break 
          case 'showDatabases2':
            commandResult = await mongoClient.db().admin().listDatabases()
            //console.log(commandResult.databases);
            commandResult.databases.forEach(db => console.log(db.name + ' ' + db.sizeOnDisk));
          break 
          case 'showCollections':
            //commandResult = await mongoClient.db("admin").command({ listDatabases: 1, nameOnly: false });
            commandResult =  await db.listCollections().toArray()
            commandResult = await  db.command({ listCollections: 1, nameOnly: false });
            console.log(commandResult);
          break 
          case 'dropCollections':
//             const collection = db.collection(collection_name);

            await collection.drop( (err, delOK) => {
              if (err) console.log("Collection deleted faield!!!!!!"); // throw err;
              if (delOK) console.log("Collection deleted");
      });

          break 

          default:
            console.log(`Unknown operation=${operation}`);
        }
      
      } finally {
          await mongoClient.close();
      }
  }



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
 | Testing mongoDo
 +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
 //mongoDo('insertOne',mongo_uri,mongo_db,mongo_collection,hani_json_doc) ;
 //mongoDo('insertMany',mongo_uri,mongo_db,mongo_collection,hani_json_doc_array) ;
 // mongoDo('showDatabases2',mongo_uri,mongo_db,mongo_collection,'',{ dep: 'Sales' },'sort( { name: -1 } )') 
//   mongoDo('findAll'   ,mongo_uri,mongo_db,mongo_collection,'','')
  // mongoDo('find',mongo_uri,mongo_db,mongo_collection,'',{ dep: 'Sales' },'sort( { name: -1 } )')
  mongoDo('showDatabases',mongo_uri,mongo_db,mongo_collection,'',{ dep: 'Sales' },'sort( { name: -1 } )')
//  mongoDo('showCollections',mongo_uri,mongo_db,mongo_collection,'',{ dep: 'Sales' },'sort( { name: -1 } )')
 //mongoDo('dropCollections',mongo_uri,mongo_db,mongo_collection,'','','')






return ;
