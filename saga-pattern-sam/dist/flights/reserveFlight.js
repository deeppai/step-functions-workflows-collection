"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const { DynamoDB } = require('aws-sdk');
exports.handler = async function (event) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    let flightReservationID = hashIt('' + event.depart + event.arrive);
    console.log("flightReservationID:", flightReservationID);
    // Pass the parameter to fail this step 
    if (event.run_type === 'failFlightsReservation') {
        throw new Error('Failed to book the flights');
    }
    // create AWS SDK clients
    const dynamo = new DynamoDB();
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'pk': { S: event.trip_id },
            'sk': { S: flightReservationID },
            'trip_id': { S: event.trip_id },
            'id': { S: flightReservationID },
            'depart_city': { S: event.depart_city },
            'depart_time': { S: event.depart_time },
            'arrive_city': { S: event.arrive_city },
            'arrive_time': { S: event.arrive_time },
            'transaction_status': { S: 'pending' }
        }
    };
    // Call DynamoDB to add the item to the table
    let result = await dynamo.putItem(params).promise().catch((error) => {
        throw new Error(error);
    });
    console.log('inserted flight reservation:');
    console.log(result);
    return {
        status: "ok",
        booking_id: flightReservationID
    };
};
function hashIt(s) {
    let myHash;
    for (let i = 0; i < s.length; i++) {
        myHash = Math.imul(31, myHash) + s.charCodeAt(i) | 0;
    }
    return '' + Math.abs(myHash);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2ZUZsaWdodC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xhbWJkYXMvZmxpZ2h0cy9yZXNlcnZlRmxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFHM0IsUUFBQSxPQUFPLEdBQUcsS0FBSyxXQUFVLEtBQVM7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0QsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUV2RCx3Q0FBd0M7SUFDeEMsSUFBRyxLQUFLLENBQUMsUUFBUSxLQUFLLHdCQUF3QixFQUFDO1FBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUNqRDtJQUVELHlCQUF5QjtJQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTlCLElBQUksTUFBTSxHQUFHO1FBQ1QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUNqQyxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUcsRUFBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBQztZQUN6QixJQUFJLEVBQUcsRUFBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUM7WUFDL0IsU0FBUyxFQUFHLEVBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUM7WUFDOUIsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLG1CQUFtQixFQUFDO1lBQzlCLGFBQWEsRUFBRyxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFDO1lBQ3RDLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFDO1lBQ3JDLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFDO1lBQ3JDLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFDO1lBQ3JDLG9CQUFvQixFQUFFLEVBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBQztTQUNyQztLQUNGLENBQUM7SUFFSiw2Q0FBNkM7SUFDN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUdwQixPQUFPO1FBQ0wsTUFBTSxFQUFFLElBQUk7UUFDWixVQUFVLEVBQUUsbUJBQW1CO0tBQ2hDLENBQUE7QUFDSCxDQUFDLENBQUM7QUFFRixTQUFTLE1BQU0sQ0FBQyxDQUFRO0lBQ3RCLElBQUksTUFBVSxDQUFDO0lBRWYsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDL0IsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3REO0lBRUQsT0FBTyxFQUFFLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBEeW5hbW9EQiB9ID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuZXhwb3J0IHt9O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50OmFueSkge1xuICBjb25zb2xlLmxvZyhcInJlcXVlc3Q6XCIsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCB1bmRlZmluZWQsIDIpKTtcblxuICBsZXQgZmxpZ2h0UmVzZXJ2YXRpb25JRCA9IGhhc2hJdCgnJytldmVudC5kZXBhcnQrZXZlbnQuYXJyaXZlKTtcbiAgY29uc29sZS5sb2coXCJmbGlnaHRSZXNlcnZhdGlvbklEOlwiLGZsaWdodFJlc2VydmF0aW9uSUQpXG5cbiAgLy8gUGFzcyB0aGUgcGFyYW1ldGVyIHRvIGZhaWwgdGhpcyBzdGVwIFxuICBpZihldmVudC5ydW5fdHlwZSA9PT0gJ2ZhaWxGbGlnaHRzUmVzZXJ2YXRpb24nKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGJvb2sgdGhlIGZsaWdodHMnKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBBV1MgU0RLIGNsaWVudHNcbiAgY29uc3QgZHluYW1vID0gbmV3IER5bmFtb0RCKCk7XG5cbiAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSxcbiAgICAgIEl0ZW06IHtcbiAgICAgICAgJ3BrJyA6IHtTOiBldmVudC50cmlwX2lkfSxcbiAgICAgICAgJ3NrJyA6IHtTOiBmbGlnaHRSZXNlcnZhdGlvbklEfSxcbiAgICAgICAgJ3RyaXBfaWQnIDoge1M6IGV2ZW50LnRyaXBfaWR9LFxuICAgICAgICAnaWQnOiB7UzogZmxpZ2h0UmVzZXJ2YXRpb25JRH0sXG4gICAgICAgICdkZXBhcnRfY2l0eScgOiB7UzogZXZlbnQuZGVwYXJ0X2NpdHl9LFxuICAgICAgICAnZGVwYXJ0X3RpbWUnOiB7UzogZXZlbnQuZGVwYXJ0X3RpbWV9LFxuICAgICAgICAnYXJyaXZlX2NpdHknOiB7UzogZXZlbnQuYXJyaXZlX2NpdHl9LFxuICAgICAgICAnYXJyaXZlX3RpbWUnOiB7UzogZXZlbnQuYXJyaXZlX3RpbWV9LFxuICAgICAgICAndHJhbnNhY3Rpb25fc3RhdHVzJzoge1M6ICdwZW5kaW5nJ31cbiAgICAgIH1cbiAgICB9O1xuICBcbiAgLy8gQ2FsbCBEeW5hbW9EQiB0byBhZGQgdGhlIGl0ZW0gdG8gdGhlIHRhYmxlXG4gIGxldCByZXN1bHQgPSBhd2FpdCBkeW5hbW8ucHV0SXRlbShwYXJhbXMpLnByb21pc2UoKS5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKCdpbnNlcnRlZCBmbGlnaHQgcmVzZXJ2YXRpb246Jyk7XG4gIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiBcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IFwib2tcIixcbiAgICBib29raW5nX2lkOiBmbGlnaHRSZXNlcnZhdGlvbklEXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGhhc2hJdChzOnN0cmluZykge1xuICBsZXQgbXlIYXNoOmFueTtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKyl7XG4gICAgbXlIYXNoID0gTWF0aC5pbXVsKDMxLCBteUhhc2gpICsgcy5jaGFyQ29kZUF0KGkpIHwgMDtcbiAgfVxuXG4gIHJldHVybiAnJyArTWF0aC5hYnMobXlIYXNoKTtcbn0iXX0=