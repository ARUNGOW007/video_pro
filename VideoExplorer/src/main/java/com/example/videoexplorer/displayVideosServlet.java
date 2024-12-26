package com.example.videoexplorer;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;

public class displayVideosServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

        File videoFolder = new File("/home/arun-pt7752/IdeaProjects/VideoExplorer/src/main/webapp/samplevideos");
        File[] videoFiles = videoFolder.listFiles((_, name) -> name.toLowerCase().endsWith(".mp4"));

        res.setContentType("application/json");
        PrintWriter out = res.getWriter();

        StringBuilder json = new StringBuilder();
        json.append("[");
        if (videoFiles != null && videoFiles.length > 0) {
            for (int itr = 0; itr < videoFiles.length; itr++) {
                File videoFile = videoFiles[itr];
                String videoName = videoFile.getName();
                String url = "http://localhost:8080/VideoExplorer_war_exploded/view?video=" + videoName;

                json.append("{");
                json.append("\"name\":\"").append(videoName).append("\",");
                json.append("\"url\":\"").append(url).append("\"");
                json.append("}");

                if (itr < videoFiles.length - 1) {
                    json.append(",");
                }
            }
            json.append("]");
            out.write(json.toString());
        }
    }
}
