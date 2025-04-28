package com.stratify.server.aws;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class FileUploadS3Service {

  private final S3Client s3Client;

  @Value("${aws.s3.bucket}")
  private String bucketName;

  public FileUploadS3Service(S3Client s3Client) {
    this.s3Client = s3Client;
  }

  public String uploadFile(MultipartFile file) {
    String key = UUID.randomUUID() + "_" + file.getOriginalFilename();

    try {
      PutObjectRequest putObjectRequest = PutObjectRequest.builder()
          .bucket(bucketName)
          .key(key)
          .contentType(file.getContentType())
          .build();

      s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

      return key;
    } catch (IOException e) {
      throw new RuntimeException("Failed to upload file to S3", e);
    }
  }

  public String getFileUrl(String key) {
    return String.format("%s/%s/%s", s3Client.serviceClientConfiguration().endpointOverride().get(), bucketName, key);
  }

  public void deleteFile(String key) {
    DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
        .bucket(bucketName)
        .key(key)
        .build();

    s3Client.deleteObject(deleteObjectRequest);
  }

}
