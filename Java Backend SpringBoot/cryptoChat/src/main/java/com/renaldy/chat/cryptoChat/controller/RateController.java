package com.renaldy.chat.cryptoChat.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/crypto")
@CrossOrigin(origins = "*")
public class RateController {

    @GetMapping(path = "/rates", produces = "application/json")
    public String getRates() {
        String uri = "https://api.coincap.io/v2/rates"; // Updated URI with protocol
        RestTemplate restTemplate = new RestTemplate();
        try {
            String result = restTemplate.getForObject(uri, String.class);

            // Convert JSON string to an Object (to format it nicely)
            ObjectMapper objectMapper = new ObjectMapper();
            Object jsonObject = objectMapper.readValue(result, Object.class);
            String prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);

            return prettyJson;
        } catch (JsonProcessingException e) {
            // Handle JSON processing exceptions
            e.printStackTrace();
            return "Error occurred while processing JSON: " + e.getMessage();
        } catch (Exception e) {
            // Handle other exceptions
            e.printStackTrace();
            return "Error occurred while fetching rates: " + e.getMessage();
        }
    }
}
