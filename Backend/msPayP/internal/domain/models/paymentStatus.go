package models

type PaymentStatus string

const (
    PaymentSuccessful PaymentStatus = "Successful"
    PaymentFailed     PaymentStatus = "Failed"
    PaymentCancelled  PaymentStatus = "Cancelled"
)