package structure

type Servers struct {
	Country   string `json:"country"`
	Ipaddress string `json:"ipaddress"`
	Port      string `json:"port"`
	Protocol  string `json:"protocol"`
	Added     string `json:"added"`
}

type AnalyticsResponse struct {
	Servers   int `json:"servers"`
	Countries int `json:"countries"`
}

type ChartsResponse struct {
	Country string `json:"country"`
	Servers int    `json:"servers"`
}
