package main

import (
	"easyvpn-api/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	//Echo instance
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	//Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//Routes - GET
	e.GET("/api/getanalytics", routes.GetAnalytics)
	e.GET("/api/getcharts", routes.GetCharts)
	e.GET("/api/getservers", routes.GetServers)

	//Routes - POST
	e.POST("/api/getprofile", routes.GetProfile)

	//Server
	e.Logger.Fatal(e.Start(":8000"))
}
