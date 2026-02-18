package com.aden.fileserver;

import com.aden.fileserver.storage.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService storage;

    public FileController(FileStorageService storage) {
        this.storage = storage;
    }

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        String storedName = storage.save(file);

        return ResponseEntity.ok(Map.of(
                "message", "uploaded",
                "storedName", storedName,
                "originalName", file.getOriginalFilename(),
                "size", file.getSize(),
                "contentType", file.getContentType()
        ));
    }
}
