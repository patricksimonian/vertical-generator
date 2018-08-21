# Vertical Generator

The server side for creating prefilled HTML/CSS projects based on a vertical/color theme.
> Patrick Simonian 2018

### While the interface is still in development, this program can still be run as a local server and posted too via Postman or Curl.

---
#### Available Color Palettes (updated June 28 2018)
- DESERT
- TROPICAL
- DAQUIRI
- ORANGINA
- POST_MODERN


> Example Request
```
Content-Type: 'application/json'
Request-Body: {
  "payload": [
    {
      "project_name": "foo",
      "palette": "POST_MODERN",
      "vertical": "bar",
      "package": "zoop"
    }
  ]
}
```
