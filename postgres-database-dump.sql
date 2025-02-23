--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: gomes_library_system_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO gomes_library_system_user;

--
-- Name: endereco; Type: TYPE; Schema: public; Owner: gomes_library_system_user
--

CREATE TYPE public.endereco AS (
	rua character varying(100),
	bairro character varying(100),
	cidade character varying(100),
	estado character varying(100),
	pais character varying(100),
	cep character varying(20)
);


ALTER TYPE public.endereco OWNER TO gomes_library_system_user;

--
-- Name: atualiza_estoque_devolucao(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.atualiza_estoque_devolucao() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE Livro_Biblioteca
    SET Quantidade_Disponivel = Quantidade_Disponivel + 1
    WHERE ID_Livro = OLD.ID_Livro AND ID_Biblioteca = OLD.ID_Biblioteca;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.atualiza_estoque_devolucao() OWNER TO gomes_library_system_user;

--
-- Name: atualiza_estoque_emprestimo(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.atualiza_estoque_emprestimo() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE Livro_Biblioteca
    SET Quantidade_Disponivel = Quantidade_Disponivel - 1
    WHERE ID_Livro = NEW.ID_Livro AND ID_Biblioteca = NEW.ID_Biblioteca;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualiza_estoque_emprestimo() OWNER TO gomes_library_system_user;

--
-- Name: trg_restricao_alteracao_preco_func(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.trg_restricao_alteracao_preco_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.Preco > OLD.Preco * 1.5 THEN
        RAISE EXCEPTION 'O aumento no preço não pode exceder 50%% do valor anterior.';
    ELSIF NEW.Preco < OLD.Preco * 0.5 THEN
        RAISE EXCEPTION 'A redução no preço não pode ser inferior a 50%% do valor anterior.';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.trg_restricao_alteracao_preco_func() OWNER TO gomes_library_system_user;

--
-- Name: valida_data_devolucao(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.valida_data_devolucao() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica se a data de devolução é válida (maior ou igual à data de empréstimo)
    IF NEW.Data_Devolucao IS NOT NULL AND NEW.Data_Devolucao < NEW.Data_Emprestimo THEN
        RAISE EXCEPTION 'A data de devolução deve ser maior ou igual à data de empréstimo.';
    END IF;
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.valida_data_devolucao() OWNER TO gomes_library_system_user;

--
-- Name: validar_categorias_unicas(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.validar_categorias_unicas() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
-- Verificar se há categorias duplicadas no array
IF EXISTS (
    SELECT 1
    FROM unnest(NEW.Categoria) AS categorias
    GROUP BY categorias
    HAVING COUNT(*) > 1
) THEN
    RAISE EXCEPTION 'O array de categorias contém valores duplicados.';
END IF;

RETURN NEW;
END;
$$;


ALTER FUNCTION public.validar_categorias_unicas() OWNER TO gomes_library_system_user;

--
-- Name: verifica_limite_emprestimos(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.verifica_limite_emprestimos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF (SELECT COUNT(*) FROM Emprestimo WHERE CPF_Usuario = NEW.CPF_Usuario AND Data_Devolucao IS NULL) >= 5 THEN
    RAISE EXCEPTION 'Limite de empréstimos atingido para o usuário.';
END IF;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.verifica_limite_emprestimos() OWNER TO gomes_library_system_user;

--
-- Name: verifica_prazo_devolucao(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.verifica_prazo_devolucao() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF EXISTS (SELECT 1 FROM Emprestimo WHERE CPF_Usuario = NEW.CPF_Usuario AND Data_Devolucao IS NULL AND Data_Emprestimo < CURRENT_DATE - INTERVAL '30 days') THEN
    RAISE EXCEPTION 'Usuário possui empréstimos atrasados. Bloqueando novos empréstimos.';
END IF;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.verifica_prazo_devolucao() OWNER TO gomes_library_system_user;

--
-- Name: verificar_emprestimo_ativo(); Type: FUNCTION; Schema: public; Owner: gomes_library_system_user
--

CREATE FUNCTION public.verificar_emprestimo_ativo() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM Emprestimo 
        WHERE CPF_Usuario = NEW.CPF_Usuario 
          AND ID_Livro = NEW.ID_Livro 
          AND Data_Devolucao IS NULL
    ) THEN
        RAISE EXCEPTION 'Usuário já pegou este livro e ainda não devolveu!';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.verificar_emprestimo_ativo() OWNER TO gomes_library_system_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: biblioteca; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.biblioteca (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    endereco public.endereco NOT NULL,
    telefone character(11) NOT NULL
);


ALTER TABLE public.biblioteca OWNER TO gomes_library_system_user;

--
-- Name: biblioteca_id_seq; Type: SEQUENCE; Schema: public; Owner: gomes_library_system_user
--

CREATE SEQUENCE public.biblioteca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.biblioteca_id_seq OWNER TO gomes_library_system_user;

--
-- Name: biblioteca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomes_library_system_user
--

ALTER SEQUENCE public.biblioteca_id_seq OWNED BY public.biblioteca.id;


--
-- Name: emprestimo; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.emprestimo (
    id integer NOT NULL,
    cpf_usuario character(11) NOT NULL,
    id_livro integer NOT NULL,
    id_biblioteca integer NOT NULL,
    data_emprestimo date NOT NULL,
    data_devolucao date
);


ALTER TABLE public.emprestimo OWNER TO gomes_library_system_user;

--
-- Name: emprestimo_id_seq; Type: SEQUENCE; Schema: public; Owner: gomes_library_system_user
--

CREATE SEQUENCE public.emprestimo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.emprestimo_id_seq OWNER TO gomes_library_system_user;

--
-- Name: emprestimo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomes_library_system_user
--

ALTER SEQUENCE public.emprestimo_id_seq OWNED BY public.emprestimo.id;


--
-- Name: livro; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.livro (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    autor character varying(100) NOT NULL,
    categoria character varying(50)[] NOT NULL,
    paginas integer NOT NULL,
    preco numeric(10,2) NOT NULL,
    idioma character varying(120) NOT NULL,
    CONSTRAINT check_categoria CHECK ((categoria <@ ARRAY['Ficção'::character varying, 'Não-ficção'::character varying, 'Romance'::character varying, 'Biografia'::character varying, 'Fantasia'::character varying, 'Ciência'::character varying, 'História'::character varying, 'Terror'::character varying, 'Infantil'::character varying, 'Aventura'::character varying, 'Suspense'::character varying, 'Autoajuda'::character varying, 'Religioso'::character varying])),
    CONSTRAINT livro_paginas_check CHECK ((paginas >= 1)),
    CONSTRAINT livro_preco_check CHECK ((preco >= (0)::numeric))
);


ALTER TABLE public.livro OWNER TO gomes_library_system_user;

--
-- Name: livro_biblioteca; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.livro_biblioteca (
    id_livro integer NOT NULL,
    id_biblioteca integer NOT NULL,
    quantidade_disponivel integer NOT NULL,
    id integer NOT NULL,
    CONSTRAINT livro_biblioteca_quantidade_disponivel_check CHECK ((quantidade_disponivel >= 0))
);


ALTER TABLE public.livro_biblioteca OWNER TO gomes_library_system_user;

--
-- Name: livro_biblioteca_id_seq; Type: SEQUENCE; Schema: public; Owner: gomes_library_system_user
--

CREATE SEQUENCE public.livro_biblioteca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.livro_biblioteca_id_seq OWNER TO gomes_library_system_user;

--
-- Name: livro_biblioteca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomes_library_system_user
--

ALTER SEQUENCE public.livro_biblioteca_id_seq OWNED BY public.livro_biblioteca.id;


--
-- Name: livro_id_seq; Type: SEQUENCE; Schema: public; Owner: gomes_library_system_user
--

CREATE SEQUENCE public.livro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.livro_id_seq OWNER TO gomes_library_system_user;

--
-- Name: livro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomes_library_system_user
--

ALTER SEQUENCE public.livro_id_seq OWNED BY public.livro.id;


--
-- Name: operador; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.operador (
    usuario_login character varying(50) NOT NULL,
    senha character varying(30) NOT NULL
);


ALTER TABLE public.operador OWNER TO gomes_library_system_user;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: gomes_library_system_user
--

CREATE TABLE public.usuario (
    cpf character(11) NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100),
    telefone character(11) NOT NULL,
    data_nascimento date NOT NULL,
    endereco public.endereco NOT NULL,
    senha character varying(30) NOT NULL
);


ALTER TABLE public.usuario OWNER TO gomes_library_system_user;

--
-- Name: biblioteca id; Type: DEFAULT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.biblioteca ALTER COLUMN id SET DEFAULT nextval('public.biblioteca_id_seq'::regclass);


--
-- Name: emprestimo id; Type: DEFAULT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.emprestimo ALTER COLUMN id SET DEFAULT nextval('public.emprestimo_id_seq'::regclass);


--
-- Name: livro id; Type: DEFAULT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro ALTER COLUMN id SET DEFAULT nextval('public.livro_id_seq'::regclass);


--
-- Name: livro_biblioteca id; Type: DEFAULT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro_biblioteca ALTER COLUMN id SET DEFAULT nextval('public.livro_biblioteca_id_seq'::regclass);


--
-- Data for Name: biblioteca; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.biblioteca (id, nome, endereco, telefone) FROM stdin;
1	Biblioteca Central	("Av. Brasil, 500",Centro,"Rio de Janeiro",RJ,Brasil,20040-000)	21912345678
2	Biblioteca Paulista	("Rua Augusta, 250",Consolação,"São Paulo",SP,Brasil,01304-001)	11987654321
3	Biblioteca do Saber	("Av. João Goulart, 70",Centro,"Porto Alegre",RS,Brasil,90010-110)	51934567890
4	Biblioteca Cultura	("Av. Independência, 120","Boa Vista",Recife,PE,Brasil,50050-000)	81922334455
5	Biblioteca Minas	("Praça Sete de Setembro, 2",Centro,"Belo Horizonte",MG,Brasil,30110-900)	31933221100
6	Biblioteca Nacional	("Rua México, s/n",Centro,"Rio de Janeiro",RJ,Brasil,20031-144)	2122228080 
7	Biblioteca Municipal de Curitiba	("Rua Cândido Lopes, 133",Centro,Curitiba,PR,Brasil,80020-060)	4132259999 
8	Biblioteca do Conhecimento	("Av. Tancredo Neves, 148","Caminho das Árvores",Salvador,BA,Brasil,41820-020)	7132114455 
9	Biblioteca de Brasília	("Setor Cultural Sul","Asa Sul",Brasília,DF,Brasil,70340-010)	6133456677 
10	Biblioteca do Amazonas	("Rua Barroso, 57",Centro,Manaus,AM,Brasil,69005-050)	9232345566 
\.


--
-- Data for Name: emprestimo; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.emprestimo (id, cpf_usuario, id_livro, id_biblioteca, data_emprestimo, data_devolucao) FROM stdin;
2	32168781044	2	1	2024-01-01	2024-01-10
3	90202975037	3	2	2024-01-03	2024-01-15
4	23854652054	4	3	2023-12-28	\N
5	87359218039	5	4	2023-12-30	\N
1	23611482005	1	1	2024-01-02	2025-01-29
16	23611482005	1	1	2025-01-29	\N
24	23611482005	2	1	2025-02-18	\N
25	23611482005	3	2	2025-02-18	\N
\.


--
-- Data for Name: livro; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.livro (id, titulo, autor, categoria, paginas, preco, idioma) FROM stdin;
2	Fundação	Isaac Asimov	{Ficção,Ciência}	320	59.90	Português
3	A Breve História do Tempo	Stephen Hawking	{Ciência}	240	45.00	Português
4	Dom Quixote	Miguel de Cervantes	{Aventura,Romance}	928	89.90	Português
5	Harry Potter e a Pedra Filosofal	J.K. Rowling	{Fantasia,Aventura}	223	39.90	Português
6	1984	George Orwell	{Ficção,Suspense}	328	4.90	Português
7	O Senhor dos Anéis	J.R.R. Tolkien	{Fantasia,Aventura}	1216	9.90	Português
8	Sapiens: Uma Breve História da Humanidade	Yuval Noah Harari	{História,Não-ficção}	464	7.90	Português
9	O Código Da Vinci	Dan Brown	{Suspense,Ficção}	480	9.90	Português
10	A Revolução dos Bichos	George Orwell	{Ficção,História}	152	10.90	Português
1	O Morro dos Ventos Uivantes	Emily Brontë	{Romance}	416	42.90	Português
19	Eu quero danone	MarieleFranco	{Não-ficção}	2	6.00	Português
20	Conjunto de instrucoes	Gabriel	{Romance}	21	6.00	Inglês
\.


--
-- Data for Name: livro_biblioteca; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.livro_biblioteca (id_livro, id_biblioteca, quantidade_disponivel, id) FROM stdin;
4	3	2	3
5	4	7	4
1	5	6	5
3	4	1	6
1	1	5	7
2	1	2	1
3	2	1	2
\.


--
-- Data for Name: operador; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.operador (usuario_login, senha) FROM stdin;
joao.silva	senha123
maria.santos	seguranca456
ana.clara	acesso789
pedro.almeida	login321
fernanda.oliveira	senhaSegura2025
amauri	guina
zelda	link
marinho	nossa
admin	admin
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: gomes_library_system_user
--

COPY public.usuario (cpf, nome, email, telefone, data_nascimento, endereco, senha) FROM stdin;
32168781044	João Pedro	joao.pedro@hotmail.com	31999996666	1985-08-10	("Av. Paulista, 1500","Bela Vista","São Paulo",SP,Brasil,01310-200)	1234
90202975037	Mariana Oliveira	mariana.oliveira@yahoo.com	21977778888	1995-01-25	("Rua dos Pinheiros, 45",Pinheiros,"São Paulo",SP,Brasil,05422-000)	12345
23854652054	Carlos Almeida	carlos.almeida@empresa.com	11966665555	1978-11-05	("Rua XV de Novembro, 300",Centro,Curitiba,PR,Brasil,80020-310)	123456
87359218039	Fernanda Souza	fernanda.souza@gmail.com	21944443333	1992-07-20	("Rua Bahia, 100",Savassi,"Belo Horizonte",MG,Brasil,30140-001)	1234567
66723854012	JosefinoMedelei	MarieleFranco@lula.com	9222543599 	1999-02-11	(Marta,"Mora Longe","Belo Horizonte","Minas Gerais",Brasil,6192)	odeiocolica
14085335022	Mario Bros	nintendo@nintendo.com.br	3133888396 	1987-02-02	(Cogumelo,"Koopa Place",Mushroom,Mushroom,"Mushroom Kingdom",64)	luigi
23611482005	Ana Júlia	ana.clara@gmail.com	21988887777	1990-03-15	("Rua das Flores",123,Centro,"Rio de Janeiro",RJ,Brasil)	pokemon
65347668091	Guina	gmail@gmail.com	3133888392 	2025-02-06	(Rua,Bairro,Cidade,Estado,Pais,253)	pokemon
30458260088	Caio Lopes	caiolopesmalta@yahoo.com	3133888396 	2025-02-10	(Rua,Bairro,Cidade,Estado,Pais,Numero)	lopes
\.


--
-- Name: biblioteca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomes_library_system_user
--

SELECT pg_catalog.setval('public.biblioteca_id_seq', 11, true);


--
-- Name: emprestimo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomes_library_system_user
--

SELECT pg_catalog.setval('public.emprestimo_id_seq', 25, true);


--
-- Name: livro_biblioteca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomes_library_system_user
--

SELECT pg_catalog.setval('public.livro_biblioteca_id_seq', 14, true);


--
-- Name: livro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomes_library_system_user
--

SELECT pg_catalog.setval('public.livro_id_seq', 20, true);


--
-- Name: biblioteca biblioteca_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.biblioteca
    ADD CONSTRAINT biblioteca_pkey PRIMARY KEY (id);


--
-- Name: emprestimo emprestimo_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.emprestimo
    ADD CONSTRAINT emprestimo_pkey PRIMARY KEY (id);


--
-- Name: livro_biblioteca livro_biblioteca_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro_biblioteca
    ADD CONSTRAINT livro_biblioteca_pkey PRIMARY KEY (id);


--
-- Name: livro livro_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro
    ADD CONSTRAINT livro_pkey PRIMARY KEY (id);


--
-- Name: operador operador_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.operador
    ADD CONSTRAINT operador_pkey PRIMARY KEY (usuario_login);


--
-- Name: livro unique_titulo; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro
    ADD CONSTRAINT unique_titulo UNIQUE (titulo);


--
-- Name: livro unique_titulo_autor; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro
    ADD CONSTRAINT unique_titulo_autor UNIQUE (titulo, autor);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (cpf);


--
-- Name: emprestimo trg_atualiza_estoque_devolucao; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_atualiza_estoque_devolucao AFTER UPDATE ON public.emprestimo FOR EACH ROW WHEN (((old.data_devolucao IS NULL) AND (new.data_devolucao IS NOT NULL))) EXECUTE FUNCTION public.atualiza_estoque_devolucao();


--
-- Name: emprestimo trg_atualiza_estoque_emprestimo; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_atualiza_estoque_emprestimo AFTER INSERT ON public.emprestimo FOR EACH ROW EXECUTE FUNCTION public.atualiza_estoque_emprestimo();


--
-- Name: emprestimo trg_limite_emprestimos; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_limite_emprestimos BEFORE INSERT ON public.emprestimo FOR EACH ROW EXECUTE FUNCTION public.verifica_limite_emprestimos();


--
-- Name: emprestimo trg_prazo_devolucao; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_prazo_devolucao BEFORE INSERT ON public.emprestimo FOR EACH ROW EXECUTE FUNCTION public.verifica_prazo_devolucao();


--
-- Name: livro trg_restricao_alteracao_preco; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_restricao_alteracao_preco BEFORE UPDATE OF preco ON public.livro FOR EACH ROW WHEN ((old.preco IS NOT NULL)) EXECUTE FUNCTION public.trg_restricao_alteracao_preco_func();


--
-- Name: emprestimo trg_valida_data_devolucao; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trg_valida_data_devolucao BEFORE INSERT OR UPDATE ON public.emprestimo FOR EACH ROW EXECUTE FUNCTION public.valida_data_devolucao();


--
-- Name: livro trigger_validar_categorias_unicas; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trigger_validar_categorias_unicas BEFORE INSERT OR UPDATE ON public.livro FOR EACH ROW EXECUTE FUNCTION public.validar_categorias_unicas();


--
-- Name: emprestimo trigger_verifica_emprestimo; Type: TRIGGER; Schema: public; Owner: gomes_library_system_user
--

CREATE TRIGGER trigger_verifica_emprestimo BEFORE INSERT ON public.emprestimo FOR EACH ROW EXECUTE FUNCTION public.verificar_emprestimo_ativo();


--
-- Name: emprestimo emprestimo_cpf_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.emprestimo
    ADD CONSTRAINT emprestimo_cpf_usuario_fkey FOREIGN KEY (cpf_usuario) REFERENCES public.usuario(cpf);


--
-- Name: emprestimo emprestimo_id_biblioteca_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.emprestimo
    ADD CONSTRAINT emprestimo_id_biblioteca_fkey FOREIGN KEY (id_biblioteca) REFERENCES public.biblioteca(id);


--
-- Name: emprestimo emprestimo_id_livro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.emprestimo
    ADD CONSTRAINT emprestimo_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES public.livro(id);


--
-- Name: livro_biblioteca livro_biblioteca_id_biblioteca_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro_biblioteca
    ADD CONSTRAINT livro_biblioteca_id_biblioteca_fkey FOREIGN KEY (id_biblioteca) REFERENCES public.biblioteca(id);


--
-- Name: livro_biblioteca livro_biblioteca_id_livro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomes_library_system_user
--

ALTER TABLE ONLY public.livro_biblioteca
    ADD CONSTRAINT livro_biblioteca_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES public.livro(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO gomes_library_system_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO gomes_library_system_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO gomes_library_system_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO gomes_library_system_user;


--
-- PostgreSQL database dump complete
--

