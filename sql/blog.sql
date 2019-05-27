-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 27, 2019 alle 21:52
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
DROP DATABASE IF EXISTS `blog`;
CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- Struttura della tabella `articoli`
--


CREATE TABLE `articoli` (
  `Id_A` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User` varchar(16) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `articoli`
--

INSERT INTO `articoli` (`Id_A`, `Testo`, `Data`, `User`) VALUES
(1, '<p>Test 2</p>', '2019-05-26 14:09:58', 'Alessio'),
(2, '<p>arat</p>', '2019-05-26 14:10:04', 'Alessio'),
(3, '<p>Hello There</p>', '2019-05-26 14:10:15', 'Alessio'),
(4, '<p>test</p>', '2019-05-27 20:33:41', 'Alessio');

-- --------------------------------------------------------

--
-- Struttura della tabella `commenti`
--


CREATE TABLE `commenti` (
  `Id_C` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_A` int(11) NOT NULL,
  `User` varchar(16) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `commenti`
--

INSERT INTO `commenti` (`Id_C`, `Testo`, `Data`, `Id_A`, `User`) VALUES
(1, '<p>sad</p>', '2019-05-27 20:29:06', 3, 'Alessio'),
(2, '<p>sad</p>', '2019-05-27 20:29:21', 3, 'Alessio'),
(3, '<p>sad</p>', '2019-05-27 20:31:07', 3, 'Alessio'),
(4, '<p>test</p>', '2019-05-27 20:32:12', 3, 'Alessio');

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
  `Id_R` int(11) NOT NULL DEFAULT '1',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`User`, `Psw`, `Mail`, `Nome`, `Cognome`, `Residenza`, `Biografia`, `Id_R`, `token`) VALUES
('Alessio', '$2y$10$zH1u4oA82b1DAx06PIrM6uKnFpLaqANQMoCMl4by5swZ4DRjYTjsG', 'alessio.agnese.iic97@gmail.com', 'Test2', 'Test2', 'Test2', 'Test2', 3, '$2y$10$R8vusKxOuVSOtR3BTw8jbuHrepSRSMEAzM0yVtO072d0g0Zgnbqni'),
('Alessio5', '$2y$10$VRL1G/hyJfAwoQBcEWB0zOsNui7qnm8C8/PiYQH9L/XjE3HOVJyhe', 'alessio.agnese.iic97@gmail.cf', '', '', '', '', 1, 'cdfbc5833e40ed18908f311b642a20bb4f671c86'),
('Alessio6', '$2y$10$8Nuu5um8Q6SE14ZJoqz5IOYN3Jey6426cDmFXD3V2RzM44SYlgpOq', 'alessio.nese.iic97@gmail.com', '', '', '', '', 1, '$2y$10$DkN9FZyRP5hGt3WAuFZuxe/vWslPhLlxXM9pmTosz6AJGlU9rdMM2');

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
  ADD KEY `commento_utente` (`User`),
  ADD KEY `commento_articolo` (`Id_A`);

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
  MODIFY `Id_A` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `commenti`
--
ALTER TABLE `commenti`
  MODIFY `Id_C` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `articolo_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limiti per la tabella `commenti`
--
ALTER TABLE `commenti`
  ADD CONSTRAINT `commento_articolo` FOREIGN KEY (`Id_A`) REFERENCES `articoli` (`Id_A`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commento_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utente_ruolo` FOREIGN KEY (`Id_R`) REFERENCES `ruoli` (`Id_R`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
