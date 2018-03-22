# data-compressor

Mit dieser Bibliothek lassen sich Daten mit verschiedenen Algorithmen komprimieren.

# Algorithmen

Folgende Algorithmen werden unterstützt:

- Data Binning
- Linear Sampling
- Swinging Door
- Delta Compression
- Deadband
- Ramer Douglas Peucker

# Schnittstellen

Daten können als number oder als Paar aus Date und number eingegeben werden.
Dabei gibt es zwei Möglichkeiten: 

- Eingabe als Array
- Eingabe als Observable

# Benutzung

Die Klasse DataCompressor ist die zentrale Schnittstelle und Einstiegspunkt.
Zunächst muss sie instanziiert werden:

``` javascript
const dc: DataCompressor = DataCompressor.Instance();
```

Anschließend kann ein Algorithmus ausgewählt werden:

``` javascript
dc.setCompressionStrategy(new DeadBandCompressionStrategy(2));
```

Nun können Daten verarbeitet werden:

``` javascript
const data: number[] = [1, 2, 3, 4, 5];
dc.compress(data);
```