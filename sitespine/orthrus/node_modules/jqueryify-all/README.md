# jqueryify-all

Get the latest jQuery version in your node app.
jqueryify-all is the faster way to include latest jQuery version in your SpineJS project.

## How to install

First you need ```node``` and ```npm``` installed in your system. For more informations go to [Node web-site](http://www.nodejs.org/).

Now you're ready to install the package. Open the terminal and type ```npm install jqueryify-all``` (sudo could be required).

```jqueryify-version``` supports all the major and minor releases of jQuery, so you can freely use the one you need in your SpineJS project

## Usage with SpineJS

If you're creating a new SpineJS app simply type ```spine app myAppName``` in the terminal window to create a new one.

Now you're ready to edit both ```package.json``` and ```slug.json``` files and replace the ```jqueryify``` entity with the ```jqueryify-all```.
You also have to edit the /app/lib/setup.coffee file replacing the ```require('jqueryify')``` row with ```require('jqueryify-all')```.
Last but not least edit your /public/index.html file requiring the right ```jqueryify-all``` package!

The version in the ```package.json``` file could be the ```latest``` or a specific jQuery version, like 1.8.0.

That's all!

## Versions availables

For compatibility reasons with SpineJS I've started deploying from the 1.6.0 jQuery version.