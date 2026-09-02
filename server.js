const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'recipeName': 'Basic Pan-Fried Chicken', 
    'ingredients': ['1lb chicken', '1/4 cornstarch', 'salt', 'pepper'], 
    'instructions' : ['Season chicken with salt and pepper', 'Coat both side with cornstarch', 'Drizzle oil and heat pan to medium-high',
      'Once hot, pan-fry the chicek for 5 minutes on each side'], 
    'cookTime': 20,
    'difficulty': 'simple'},
  { 'recipeName': 'Hamburger', 
    'ingredients': ['1lb ground beef', '1 bun', '1 slice cheese', 'garlic powder', 'onion powder', 'onion salt', 'garlic salt'],
    'instructions' : ['Form beef into 4 1/4lb patties', 'Season one side with garlic powder and onion salt',
      'Season other side with onion powder and garlic salt', 'Cook on high for 5 minutes on each side',
      'As the 2nd side cookies, add a slice of cheese'],
    'cookTime': 15,
    'difficulty': 'moderate'}
  ]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if(request.url === '/data'){
    console.log(`Getting appdata starting with: ${appdata[0]}`)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    appdata.push( JSON.parse( dataString ) )
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

    // change this to incorporate data
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
