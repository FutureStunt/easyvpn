package routes

import (
	"easyvpn-api/structure"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetAnalytics(c echo.Context) error {
	data, err := ioutil.ReadFile("./servers.json")
	if err != nil {
		return err
	}

	var dataobj []*structure.Servers

	err = json.Unmarshal(data, &dataobj)
	if err != nil {
		return err
	}

	var duplicatecheck = make(map[string]bool)
	servercount, countrycount := 0, 0

	for _, values := range dataobj {
		servercount++
		if !duplicatecheck[values.Country] {
			duplicatecheck[values.Country] = true
			countrycount++
		}
	}

	jsonResponse := &structure.AnalyticsResponse{
		Servers:   servercount,
		Countries: countrycount,
	}

	return c.JSON(http.StatusOK, jsonResponse)
}
