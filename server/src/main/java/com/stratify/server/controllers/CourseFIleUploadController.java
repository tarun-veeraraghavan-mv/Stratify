package com.stratify.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.stratify.server.aws.FileUploadS3Service;
import com.stratify.server.models.CourseFiles;
import com.stratify.server.repository.CourseFilesRepository;
import com.stratify.server.security.UserPrincipal;

@RestController
@RequestMapping("/course-files")
public class CourseFIleUploadController {

  @Autowired
  private CourseFilesRepository filesRepository;

  @Autowired
  private FileUploadS3Service s3Service;

  @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<CourseFiles> createFile(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestPart("file") MultipartFile file,
      @RequestPart CourseFiles input) {
    if (input == null) {
      throw new IllegalArgumentException("Item part is missing or invalid");
    }

    if (file == null) {
      throw new IllegalArgumentException("Item part is missing or invalid");
    }

    System.out.println("Recieved item: " + file);

    String key = s3Service.uploadFile(file);
    String fileUrl = s3Service.getFileUrl(key);

    input.setFileUrl(fileUrl);
    input.setUserId(principal.getUserId());

    CourseFiles createdFile = filesRepository.save(input);

    return ResponseEntity.ok(createdFile);
  }

  @GetMapping("/")
  public List<CourseFiles> getAllCourseFiles(@AuthenticationPrincipal UserPrincipal principal) {
    return filesRepository.findByUserId(principal.getUserId());
  }

  @DeleteMapping("/{id}")
  public void deleteFile(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
    CourseFiles file = filesRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("File not found"));

    String fileUrl = file.getFileUrl();
    if (fileUrl != null) {
      // Extract the S3 object key from the URL
      String endpointUrl = s3Service.getFileUrl(""); // This gives like "https://s3.endpoint/bucket/"
      String prefix = endpointUrl.substring(0, endpointUrl.lastIndexOf("/") + 1); // Get prefix till bucket/
      String key = fileUrl.replace(prefix, ""); // Extract key by removing prefix
      s3Service.deleteFile(key);
    }

    // Delete from DB
    filesRepository.delete(file);
  }

}
