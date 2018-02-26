import urllib.request
import boto3


def reko_test():
    # provide IAM user having programmatic access for AmazonRekognitionReadOnlyAccess

    # externalize credentials, do not hard code them (demo purpose only)

    client = boto3.client(
        'rekognition',
        'us-east-1',
        aws_access_key_id='='AKIA...',
        aws_secret_access_key=''
    )

    # alternatively image could be read from a local using:
    #  with open('source.jpg', 'rb') as source_image:
    #      source_bytes = source_image.read()

    with urllib.request.urlopen("http://i.imgur.com/OK8aDRq.jpg") as f:
        source_bytes = f.read()

        response = client.detect_faces(Image={'Bytes': source_bytes}, Attributes=['ALL'])

        for faceDetail in response['FaceDetails']:
            # Confidence level that the bounding box contains a face (and not a different object such as a tree).
            # estimated age range (low-high), in years, for a face
            print("Confidence={} AgeRange->Low={} AgeRange->High={}".format(
                faceDetail['Confidence'],
                faceDetail['AgeRange']['Low'],
                faceDetail['AgeRange']['High']))

            # Gender of the face and the confidence level in the determination.
            print("Gender: Confidence={} Genre={}".format(
                faceDetail['Gender']['Confidence'],
                faceDetail['Gender']['Value']))


if __name__ == '__main__':
    reko_test()
