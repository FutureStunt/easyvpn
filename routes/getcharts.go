package routes

import (
	"easyvpn-api/structure"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"sort"

	"github.com/labstack/echo/v4"
)

func GetCharts(c echo.Context) error {
	data, err := ioutil.ReadFile("./servers.json")
	if err != nil {
		return err
	}

	var dataobj []*structure.Servers
	var filtereddataobj []structure.ChartsResponse
	var top5obj []structure.ChartsResponse

	err = json.Unmarshal(data, &dataobj)
	if err != nil {
		return err
	}

	countrycount := make(map[string]int)

	for _, values := range dataobj {
		countrycount[values.Country]++
	}

	for k, v := range countrycount {
		filtereddataobj = append(filtereddataobj, structure.ChartsResponse{Country: k, Servers: v})
	}

	sort.Slice(filtereddataobj, func(i, j int) bool {
		return filtereddataobj[i].Servers > filtereddataobj[j].Servers
	})

	for count, kv := range filtereddataobj {
		if count < 5 {
			top5obj = append(top5obj, structure.ChartsResponse{Country: kv.Country, Servers: kv.Servers})
		}
	}

	return c.JSON(http.StatusOK, top5obj)
}
