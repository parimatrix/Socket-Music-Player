# Socket-Music-Player
This is a music player, that allows music playback from multiple devices, totally in sync.


It uses *socket.io* for communication between the server and various clients. The music is streamed directly from the server. The communication between the clients is only about the current playback time, and play and pause events, preventing much overhead.
