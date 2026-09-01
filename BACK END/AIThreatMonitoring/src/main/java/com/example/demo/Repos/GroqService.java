package com.example.demo.Repos;

import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.NetworkEvent;
import com.example.demo.Entites.SystemLog;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final OkHttpClient client = new OkHttpClient();

    // ---------------------------------------------
    // GENERIC ANALYSIS FUNCTION
    // ---------------------------------------------
    public String analyze(String text) {

        try {
            JsonObject requestJson = new JsonObject();
            requestJson.addProperty("model", model);

            JsonArray messages = new JsonArray();
            JsonObject message = new JsonObject();
            message.addProperty("role", "user");
            message.addProperty("content", text);
            messages.add(message);

            requestJson.add("messages", messages);

            RequestBody body = RequestBody.create(
                    requestJson.toString(),
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .post(body)
                    .build();

            Response response = client.newCall(request).execute();
            return response.body().string();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Groq API: " + e.getMessage();
        }
    }

    // ---------------------------------------------
    // EMAIL ANALYSIS USING LLM WITH PROPER PROMPT
    // ---------------------------------------------
    public String analyzeEmail(AttackEmail email) {

        String prompt = """
                You are a cybersecurity email analyzer.
                Detect if the following email is a phishing attempt.

                Return ONLY a JSON object like this:
                {
                  "phishing": true/false,
                  "score": 0-10,
                  "explanation": "why"
                }

                Email:
                Subject: %s
                Sender: %s
                Body: %s
                """.formatted(
                email.getSubject(),
                email.getSender(),
                email.getBody()
        );

        return analyze(prompt);
    }

    public String analyzeNetworkEvent(NetworkEvent event) {

        try {
            JsonObject requestJson = new JsonObject();
            requestJson.addProperty("model", model);

            JsonArray messages = new JsonArray();

            // SYSTEM MESSAGE → Instructs LLM how to respond
            JsonObject sys = new JsonObject();
            sys.addProperty("role", "system");
            sys.addProperty("content",
                    "You are a cybersecurity network threat detection agent. " +
                    "Analyze the given network event and return STRICT JSON ONLY in this format:\n\n" +
                    "{\n" +
                    "  \"malicious\": true/false,\n" +
                    "  \"score\": number (0-10),\n" +
                    "  \"explanation\": \"detailed reason\"\n" +
                    "}\n\n" +
                    "Do not include markdown, do not include ```json, only pure JSON."
            );
            messages.add(sys);

            // USER MESSAGE → Event information
            JsonObject user = new JsonObject();
            user.addProperty("role", "user");
            user.addProperty("content",
                    "Analyze this network event:\n\n" +
                    "Source IP: " + event.getSourceIp() + "\n" +
                    "Destination IP: " + event.getDestinationIp() + "\n" +
                    "Port: " + event.getPort() + "\n" +
                    "Protocol: " + event.getProtocol() + "\n\n" +
                    "Determine if it is malicious."
            );
            messages.add(user);

            requestJson.add("messages", messages);

            RequestBody body = RequestBody.create(
                    requestJson.toString(),
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .post(body)
                    .build();

            Response response = client.newCall(request).execute();
            return response.body().string(); // return raw JSON

        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Groq API: " + e.getMessage();
        }
    }

    public String analyzeNetworkEventLog(SystemLog log) {
        String text = "Analyze the following system log for suspicious/malicious behavior. Return JSON: {suspicious: true/false, score, explanation}.\n\n"
                      + "Log Type: " + log.getLogType() + "\n"
                      + "Log Message: " + log.getLogMessage();

        return analyze(text); // reuse your existing analyze() method
    }


}
