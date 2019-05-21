-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 19, 2019 alle 20:51
-- Versione del server: 10.1.38-MariaDB
-- Versione PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `articoli`
--

CREATE TABLE `articoli` (
  `Id_A` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `commenti`
--

CREATE TABLE `commenti` (
  `Id_C` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` date NOT NULL,
  `User` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `risposte`
--

CREATE TABLE `risposte` (
  `Id_C` int(11) NOT NULL,
  `Id_R` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `ruoli`
--

CREATE TABLE `ruoli` (
  `Id_R` int(11) NOT NULL,
  `Ruolo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `ruoli`
--

INSERT INTO `ruoli` (`Id_R`, `Ruolo`) VALUES
(1, 'Utente'),
(2, 'Moderatore'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `User` varchar(16) NOT NULL,
  `Psw` varchar(64) NOT NULL,
  `Mail` varchar(64) NOT NULL,
  `Nome` varchar(10) NOT NULL,
  `Cognome` varchar(16) NOT NULL,
  `Residenza` varchar(16) NOT NULL,
  `Biografia` mediumtext NOT NULL,
  `Id_R` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`User`, `Psw`, `Mail`, `Nome`, `Cognome`, `Residenza`, `Biografia`) VALUES
('Alessio', '$2y$10$rRlDTWtGGWbWAaf9Wo6p4ui4F1ld9tReFT79KKU6l8fA8rOe3QrsG', 'alessio.agnese.iic97@gmail.com', '', '', '', '');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `articoli`
--
ALTER TABLE `articoli`
  ADD PRIMARY KEY (`Id_A`),
  ADD KEY `articolo_utente` (`User`);

--
-- Indici per le tabelle `commenti`
--
ALTER TABLE `commenti`
  ADD PRIMARY KEY (`Id_C`),
  ADD KEY `commento_utente` (`User`);

--
-- Indici per le tabelle `risposte`
--
ALTER TABLE `risposte`
  ADD PRIMARY KEY (`Id_C`,`Id_R`),
  ADD KEY `risposta_risposta` (`Id_R`);

--
-- Indici per le tabelle `ruoli`
--
ALTER TABLE `ruoli`
  ADD PRIMARY KEY (`Id_R`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`User`),
  ADD UNIQUE KEY `Mail` (`Mail`),
  ADD KEY `utente_ruolo` (`Id_R`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `articoli`
--
ALTER TABLE `articoli`
  MODIFY `Id_A` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `commenti`
--
ALTER TABLE `commenti`
  MODIFY `Id_C` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `ruoli`
--
ALTER TABLE `ruoli`
  MODIFY `Id_R` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `articoli`
--
ALTER TABLE `articoli`
  ADD CONSTRAINT `articolo_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `commenti`
--
ALTER TABLE `commenti`
  ADD CONSTRAINT `commento_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `risposte`
--
ALTER TABLE `risposte`
  ADD CONSTRAINT `risposta_commento` FOREIGN KEY (`Id_C`) REFERENCES `commenti` (`Id_C`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `risposta_risposta` FOREIGN KEY (`Id_R`) REFERENCES `commenti` (`Id_C`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utente_ruolo` FOREIGN KEY (`Id_R`) REFERENCES `ruoli` (`Id_R`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
