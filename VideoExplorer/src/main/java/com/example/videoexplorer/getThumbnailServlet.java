package com.example.videoexplorer;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

public class getThumbnailServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String videoName = req.getParameter("video");
        String videoPath = "/home/arun-pt7752/IdeaProjects/VideoExplorer/src/main/webapp/samplevideos/" + videoName;
        File videoFile = new File(videoPath);
        res.setContentType("video/mp4");
        try (OutputStream out = res.getOutputStream();
             FileInputStream file = new FileInputStream(videoFile)) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = file.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }
}
