SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `blog`;

CREATE TABLE `articoli` (
  `Id_A` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `commenti` (
  `Id_C` int(11) NOT NULL,
  `Testo` mediumtext NOT NULL,
  `Data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_A` int(11) NOT NULL,
  `User` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ruoli` (
  `Id_R` int(11) NOT NULL,
  `Ruolo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ruoli` (`Id_R`, `Ruolo`) VALUES
(1, 'Utente'),
(2, 'Moderatore'),
(3, 'Admin');

CREATE TABLE `utenti` (
  `User` varchar(16) NOT NULL,
  `Psw` varchar(64) NOT NULL,
  `Mail` varchar(64) NOT NULL,
  `Nome` varchar(16) NOT NULL,
  `Cognome` varchar(16) NOT NULL,
  `Residenza` varchar(16) NOT NULL,
  `Biografia` mediumtext NOT NULL,
  `Avatar` varchar(32) DEFAULT NULL,
  `Id_R` int(11) NOT NULL DEFAULT '1',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `utenti` (`User`, `Psw`, `Mail`, `Nome`, `Cognome`, `Residenza`, `Biografia`, `Avatar`, `Id_R`, `token`) VALUES
('root', '$2y$10$WDyxiKq8qrGKnfPM/pzr4eTYvxflt1ZsJh/6nczz6qsioDIs8Xz5y', '', '', '', '', '', NULL, 3, '');


ALTER TABLE `articoli`
  ADD PRIMARY KEY (`Id_A`),
  ADD KEY `articolo_utente` (`User`);

ALTER TABLE `commenti`
  ADD PRIMARY KEY (`Id_C`),
  ADD KEY `commento_utente` (`User`),
  ADD KEY `commento_articolo` (`Id_A`);

ALTER TABLE `ruoli`
  ADD PRIMARY KEY (`Id_R`);

ALTER TABLE `utenti`
  ADD PRIMARY KEY (`User`),
  ADD UNIQUE KEY `Mail` (`Mail`),
  ADD KEY `utente_ruolo` (`Id_R`);


ALTER TABLE `articoli`
  MODIFY `Id_A` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `commenti`
  MODIFY `Id_C` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `ruoli`
  MODIFY `Id_R` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `articoli`
  ADD CONSTRAINT `articolo_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `commenti`
  ADD CONSTRAINT `commento_articolo` FOREIGN KEY (`Id_A`) REFERENCES `articoli` (`Id_A`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commento_utente` FOREIGN KEY (`User`) REFERENCES `utenti` (`User`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `utenti`
  ADD CONSTRAINT `utente_ruolo` FOREIGN KEY (`Id_R`) REFERENCES `ruoli` (`Id_R`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
