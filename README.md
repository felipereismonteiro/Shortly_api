# Shortly_api

- **POST** `/signup`
    - Deve receber um corpo (*body*) no formato:
        
        {
        	name: "João",
          email: "joao@driven.com.br",
          password: "driven",
          confirmPassword: "driven"
        }
        
- **POST** `/signin`
    - Deve receber um corpo (*body*) no formato:
        {
          email: "joao@driven.com.br",
          password: "driven"
        }
    - Deve retornar o *status code* `200` com o *token* gerado para autenticação.
    - Caso o usuário/senha não seja compatível (ou não exista), retornar o *status code* `401`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
    - 
- **POST** `/urls/shorten`
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Deve receber um corpo (*body*) no formato:

        {
        	"url": "https://..."
        }
        
    - Deve responder com *status code* `201` e corpo (*body*) no formato:
    - 
        {
        	"shortUrl": "a8745bcf" // aqui o identificador que for gerado
        }
        
- **GET** `/urls/:id`
    - Esta **não é** uma rota autenticada.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        
        {
        	"id": 1,
        	"shortUrl": "bd8235a0",
        	"url": "https://..."
        }
        
        
    - Caso a url encurtada não exista, responder com *status code* `404`.
    - 
- **GET** `/urls/open/:shortUrl`
    - Redirecionar o usuário para o link correspondente.
    - Aumentar um na contagem de visitas do link.
    - Caso a url encurtada não exista, responder com *status code* `404`.
  
- **DELETE** `/urls/:id`
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
    - Se a url for do usuário, deve responder com *status code* `204` e excluir a url encurtada.
    - Caso a url encurtada não exista, responder com *status code* `404`.
    
- **GET** `/users/me`
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - A rota deve retornar os dados do usuário atrelado ao token.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        
        {
          "id": id do usuário,
        	"name": nome do usuário,
        	"visitCount": soma da quantidade de visitas de todos os links do usuário,
        	"shortenedUrls": [
        		{
        			"id": 1,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		},
        		{
        			"id": 2,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		}
        	]
        }
        
        
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Caso o usuário não exista, responder com *status code* `404`.
- **GET** `/ranking`
- - Deve responder com *status code* `200` e corpo (*body*) no formato:
    
    
    [
    	{
    		"id": id do usuário,
    		"name": nome do usuário,
    		"linksCount": 5,
    		"visitCount": 100000
    	},
    	{
    		"id": id do usuário,
    		"name": nome do usuário,
    		"linksCount": 3,
    		"visitCount": 85453
    	},
    	{
    		"id": id do usuário,
    		"name": nome do usuário,
    		"linksCount": 10,
    		"visitCount": 0
    	},
    	{
    		"id": id do usuário,
    		"name": nome do usuário,
    		"linksCount": 0,
    		"visitCount": 0
    	}
    ]
    
    
## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example`

```bash
npm run dev
```

