All the dependencies are in the package, once you install 
them all you also need to brew install mongo globally (go to mongo website)

to run your db locally:
mongod --config /usr/local/etc/mongod.conf

The above needs to run persistently, so either dedicate a terminal window or 
put it in the background

after you start mongod instance you need to set up a HMS db:
$ mongo
  > use HMS
  > exit

then to run the rest server
simply switch into HMSREST
and 

$ ./bin/www

then navigate to localhost:3000


