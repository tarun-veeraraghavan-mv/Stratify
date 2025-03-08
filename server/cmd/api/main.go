package main

import (
	"server/cmd/api/routers"
	"server/internals/db"
)

func main() {
	db.ConnectDB()

	router := routers.SetupRouter()

	router.Run(":8080")
}