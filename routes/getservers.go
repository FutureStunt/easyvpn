package routes

import (
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetServers(c echo.Context) error {
	data, err := ioutil.ReadFile("./servers.json")
	if err != nil {
		return err
	}

	return c.String(http.StatusOK, string(data))
}
