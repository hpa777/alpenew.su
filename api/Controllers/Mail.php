<?php
use MODX\Revolution\Mail\modMail;
use MODX\Revolution\modX;
use MODX\Revolution\Mail\modPHPMailer;



class ControllerMail extends \MODX\Revolution\Rest\modRestController {

    private static $notif = [
        'quality_form_mail' => [            
            'subject' => "Анкета о качестве наших препаратов",
            'message' => "<div class=\"form__title\">Спасибо, сообщение отправлено!</div><div class=\"form__message\">Hаш менеджер скоро Вам ответит!</div>"
        ],
        'adverse_form_mail' => [            
            'subject' => "Форма о нежелательном явлении",
            'message' => "<div class=\"form__title\">Спасибо, сообщение отправлено!</div><div class=\"form__message\">Hаш менеджер скоро Вам ответит!</div>"
        ]

    ];

    public function post()
    {
        $tpl = $this->getProperty('template');
        $ni = self::$notif[$tpl];
        if (!$ni) {
            return $this->failure("email template not found");
        }
        $pdoTools = $this->modx->services->get("pdoTools");
        $message = $pdoTools->getChunk($tpl, $this->getProperties());
        $this->modx->log(1, $message); 
        $this->sendMail($message, $ni['subject']);               
        return $this->success('ok', []);
    }
    
    private function sendMail($message, $subject){
        $mailService = new modPHPMailer($this->modx);
        $mailService->set(modMail::MAIL_BODY, $message);
        $mailService->set(modMail::MAIL_FROM, $this->modx->getOption('emailsender'));
        $mailService->set(modMail::MAIL_FROM_NAME, $this->modx->getOption('site_name'));
        $mailService->set(modMail::MAIL_SUBJECT, $subject);
        $mailService->setHTML(true);
        foreach(explode(',', $this->modx->getOption('emailrecipient')) as $email) {
            $mailService->address('to', trim($email));
        }
        
        $result = $mailService->send();
        if (!$result) {
            $this->modx->log(modX::LOG_LEVEL_ERROR, 'An error occurred while trying to send the email: ' . $mailService->mailer->ErrorInfo);            
        }
        $mailService->reset();
        return $result;
    }

}