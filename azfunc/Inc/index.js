const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    //check permission
    if (req.query.name || (req.body && req.body.name)) {    
        //configure the endpoints, keys, ids
        const config = {
            endpoint: "https://wechatdemo.documents.azure.com:443/",
            databaseId: "Tasks",
            containerId: "Items",
            partitionKey: { kind: "Hash", paths: ["/category"] }
          };
          
        const { endpoint, databaseId, containerId } = config;
        
        const key = process.env["KeyToDB"];
        
        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);
        try {
          // Create a new item in DB
          const { resource: createdItem } = await container.items.create({
            id: "student",
            owner:"teacher",
            video: "azure",
            viewedCount: "1",
          });
      
        }catch (err) {
            console.log(err.message);
        }
      
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Thanks for viewing the video, " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass your id on the query string or in the request body"
        };
    }
};