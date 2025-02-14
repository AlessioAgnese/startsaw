SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
USE S4366276;

CREATE TABLE articoli (
  Id_A int(11) NOT NULL,
  Testo mediumtext NOT NULL,
  Data timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  User varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE commenti (
  Id_C int(11) NOT NULL,
  Testo mediumtext NOT NULL,
  Data timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  Id_A int(11) NOT NULL,
  User varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE ruoli (
  Id_R int(11) NOT NULL,
  Ruolo varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO ruoli (Id_R, Ruolo) VALUES
(1, 'Utente'),
(2, 'Admin');


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
('root', '$2y$10$WDyxiKq8qrGKnfPM/pzr4eTYvxflt1ZsJh/6nczz6qsioDIs8Xz5y', '', 'Alessio', 'Agnese', 'Genova', 'Admin supremo', NULL, 2, '$2y$10$1LYOScRW0sqlPUZeBn7IT.2NgqoNRuEt3OFN7coqZj0fLteS9x9Ce');

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
