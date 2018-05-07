docker run --log-opt max-size=500m -d -it -p 8303:8303 --name=renthero_push_notifications_ms renthero_push_notifications_ms npm run prod -- --host=0.0.0.0
