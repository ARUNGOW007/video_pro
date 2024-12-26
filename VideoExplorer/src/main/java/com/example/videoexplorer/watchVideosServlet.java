package com.example.videoexplorer;

import jakarta.servlet.http.*;
import java.io.*;

public class watchVideosServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String videoName = req.getParameter("video");
        File videoFile = new File("/home/arun-pt7752/IdeaProjects/VideoExplorer/src/main/webapp/samplevideos/" + videoName);

        if (!videoFile.exists()) {
            return;
        }

        String rangeHeader = req.getHeader("Range");
        String[] range = rangeHeader.replace("bytes=", "").split("-");
        long rangeStart = Long.parseLong(range[0]);
        long rangeEnd = range.length > 1 && !range[1].isEmpty() ? Long.parseLong(range[1]) : videoFile.length() - 1;
        long contentLength = rangeEnd - rangeStart + 1;

        res.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
        res.setHeader("Content-Range", "bytes " + rangeStart + "-" + rangeEnd + "/" + videoFile.length());
        res.setContentLengthLong(contentLength);
        res.setContentType("video/mp4");

        try (RandomAccessFile file = new RandomAccessFile(videoFile, "r");
             OutputStream out = res.getOutputStream()) {
            file.seek(rangeStart);
            byte[] buffer = new byte[4096];
            long remaining = contentLength;
            int bytesRead;
            while (remaining > 0 && (bytesRead = file.read(buffer, 0, (int) Math.min(buffer.length, remaining))) != -1) {
                out.write(buffer, 0, bytesRead);
                remaining -= bytesRead;
            }
        }
    }
}
