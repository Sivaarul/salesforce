public with sharing class Httprestult {
    
    public static void httpcallmehod()
    {
          Http http = new Http();
          HttpRequest request = new HttpRequest();
          request.setEndpoint('https://api.restful-api.dev/objects?id=3&id=5&id=10');
          request.setMethod('GET');
          request.setHeader('Content-Type', 'application/json');

          try{
              HttpResponse response = http.send(request);
              if (response.getStatusCode() == 200) {
                String responseBody = response.getBody();
                System.debug('API Response: ' + responseBody);
             //  Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
              List<object> result = (List<object>) JSON.deserializeUntyped(responseBody);

                System.debug('Title: ' + result);

          }
          else {
                System.debug('Failed with status code: ' + response.getStatusCode());
            }
    }
    catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
    }
}