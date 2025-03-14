<?php
header("Content-Type: application/json; charset=UTF-8");

$filename = 'books.json';


if (file_exists($filename)) {
    $books = json_decode(file_get_contents($filename), true);
} else {
    $books = [];
}


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        echo json_encode($books);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $newBook = [
            "id" => count($books) + 1,
            "title" => $input['title'],
            "author" => $input['author']
        ];
        $books[] = $newBook;
        file_put_contents($filename, json_encode($books)); 
        echo json_encode($newBook);
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        foreach ($books as &$book) {
            if ($book['id'] == $input['id']) {
                $book['title'] = $input['title'];
                $book['author'] = $input['author'];
                file_put_contents($filename, json_encode($books)); // Lưu vào file
                echo json_encode($book);
                break;
            }
        }
        break;

    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        foreach ($books as $key => $book) {
            if ($book['id'] == $input['id']) {
                unset($books[$key]);
                file_put_contents($filename, json_encode(array_values($books))); // Lưu vào file
                echo json_encode(["message" => "Book deleted"]);
                break;
            }
        }
        break;

    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>