package models


type PaymentMethod string

const (
    CreditCard PaymentMethod = "creditcard"
    DebitCard  PaymentMethod = "debitcard"
	Pse        PaymentMethod = "pse"
    Nequi      PaymentMethod = "nequi"
)


