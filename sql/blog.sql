SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

DROP DATABASE IF EXISTS blog ;
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE blog;

CREATE TABLE articoli (
  Id_A int(11) NOT NULL,
  Testo mediumtext NOT NULL,
  Data datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  User varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO articoli (Id_A, Testo, `Data`, `User`) VALUES
(5, '<p>Hello there</p>', '2019-05-28 11:49:48', 'root'),
(6, '<h1 style=\"text-align: center;\">Hello there</h1>\n<p>ciao</p>', '2019-05-28 11:53:14', 'root'),
(7, '<h1 style=\"text-align: center;\">Hello there</h1>\n<p>ciao</p>', '2019-05-28 11:59:50', 'root'),
(8, '<p>Hello there2</p>', '2019-05-28 14:19:06', 'root');

CREATE TABLE commenti (
  Id_C int(11) NOT NULL,
  Testo mediumtext NOT NULL,
  Data datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Id_A int(11) NOT NULL,
  User varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO commenti (Id_C, Testo, `Data`, Id_A, `User`) VALUES
(5, '<p>test</p>', '2019-05-28 14:22:21', 8, 'root');

CREATE TABLE ruoli (
  Id_R int(11) NOT NULL,
  Ruolo varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO ruoli (Id_R, Ruolo) VALUES
(1, 'Utente'),
(2, 'Moderatore'),
(3, 'Admin');

CREATE TABLE utenti (
  User varchar(16) NOT NULL,
  Psw varchar(64) NOT NULL,
  Mail varchar(64) NOT NULL,
  Nome varchar(16) NOT NULL,
  Cognome varchar(16) NOT NULL,
  Residenza varchar(16) NOT NULL,
  Biografia mediumtext NOT NULL,
  Avatar mediumblob,
  Id_R int(11) NOT NULL DEFAULT '1',
  token varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO utenti (`User`, Psw, Mail, Nome, Cognome, Residenza, Biografia, Avatar, Id_R, token) VALUES
('Alessio5', '$2y$10$LhtK3EpWo.dDHNxwJXpEjOuFiII7XK8RNvkE2Zing67M/egsejBwK', 'a2le@ale.ale', '', '', '', '', NULL, 1, '$2y$10$5JOvGDKfM3za2sZBnvGLSurBdSusnmsuKYlsNnDxBLj9d61Bxryre'),
('root', '$2y$10$WDyxiKq8qrGKnfPM/pzr4eTYvxflt1ZsJh/6nczz6qsioDIs8Xz5y', '', 'Alessio', 'Agnese', 'Genova', 'Admin supremo', NULL, 3, '$2y$10$1LYOScRW0sqlPUZeBn7IT.2NgqoNRuEt3OFN7coqZj0fLteS9x9Ce');

ALTER TABLE articoli
  ADD PRIMARY KEY (Id_A),
  ADD KEY articolo_utente (User);

ALTER TABLE commenti
  ADD PRIMARY KEY (Id_C),
  ADD KEY commento_utente (User),
  ADD KEY commento_articolo (Id_A);

ALTER TABLE ruoli
  ADD PRIMARY KEY (Id_R);

ALTER TABLE utenti
  ADD PRIMARY KEY (User),
  ADD UNIQUE KEY Mail (Mail),
  ADD KEY utente_ruolo (Id_R);


ALTER TABLE articoli
  MODIFY Id_A int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE commenti
  MODIFY Id_C int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE ruoli
  MODIFY Id_R int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE articoli
  ADD CONSTRAINT articolo_utente FOREIGN KEY (User) REFERENCES utenti (User) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE commenti
  ADD CONSTRAINT commento_articolo FOREIGN KEY (Id_A) REFERENCES articoli (Id_A) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT commento_utente FOREIGN KEY (User) REFERENCES utenti (User) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE utenti
  ADD CONSTRAINT utente_ruolo FOREIGN KEY (Id_R) REFERENCES ruoli (Id_R) ON DELETE CASCADE ON UPDATE CASCADE;
