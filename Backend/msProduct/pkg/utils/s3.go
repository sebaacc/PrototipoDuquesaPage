package utils

import (
	"bytes"
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var (
    S3Session  *s3.S3
    BucketName = "duquesabucket"
)

func InitS3() {
    sess, err := session.NewSession(&aws.Config{
        Region: aws.String("us-east-2"),
        Credentials: credentials.NewStaticCredentials(
            "AKIAZI2LFYOCGD24N3FB",    // replace with your access key id
            "4VY6bymuG99LSQk+Dr2GmS1Xy1f9do9C1pWTtsbI", // replace with your secret access key
            "",
        ),
    })
    if err != nil {
        fmt.Println("Failed to create session,", err)
        os.Exit(1)
    }

    S3Session = s3.New(sess)
}

func UploadFileToS3(fileName string, fileBody []byte) error {
    _, err := S3Session.PutObject(&s3.PutObjectInput{
        Bucket: aws.String(BucketName),
        Key:    aws.String(fileName),
        Body:   bytes.NewReader(fileBody),
    })
    return err
}

func GetFileFromS3(fileName string) (*s3.GetObjectOutput, error) {
    return S3Session.GetObject(&s3.GetObjectInput{
        Bucket: aws.String(BucketName),
        Key:    aws.String(fileName),
    })
}


func GeneratePresignedURL(fileName string) (string, error) {
    req, _ := S3Session.GetObjectRequest(&s3.GetObjectInput{
        Bucket: aws.String(BucketName),
        Key:    aws.String(fileName),
    })
    urlStr, err := req.Presign(10 * time.Hour) // Cambia el tiempo de expiración a 1 hora
    if err != nil {
        return "", fmt.Errorf("failed to sign request: %v", err)
    }
    return urlStr, nil
}

