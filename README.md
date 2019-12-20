#### Invite customer based on distance

##### Steps tobe followed

### create a .env file with following properties
`
FILEPATH='source/customers.txt'<br/>
OUTPUTFILEPATH='output/tobeinvited.txt'<br/>
ORIGINLATITUBE=<br/>
ORIGINLONGITUBE=<br/>
`

### create a source direcotory (put input file) like source/customers.txt
### create a destination direcotory like output/tobeinvited.txt

### To use 
`const customer = require('customer-invitation-distance-calculator')`
