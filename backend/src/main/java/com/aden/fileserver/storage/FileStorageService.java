package com.aden.fileserver.storage;

import org.springframework.stereotype.Service;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path root;
    
    public FileStorageService(@Value("${app.upload-dir}") String uploadDir) {
        this.root = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.root);
        } catch (Exception e) {
            throw new RuntimeException("Could not create upload directory: " + this.root, e);
        }
    }

    public String save(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String name = file.getOriginalFilename();

        if (name == null) {
            name = "file";
        }

        String original = StringUtils.cleanPath(name);

        // Prevent path traversal
        if (original.contains("..")) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String storedName = UUID.randomUUID() + "_" + original;

        Path target = root.resolve(storedName).normalize();
        if (!target.startsWith(root)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file", e);
        }

        return storedName;
        }
}
